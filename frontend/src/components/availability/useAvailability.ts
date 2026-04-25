import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth, isStaff } from "../../contexts/AuthContext";
import { photographersApi } from "../../api";

export function useAvailability(photographerId: number, initialBusyDates: string[]) {
  const { user } = useAuth();
  const isAdmin = isStaff(user);

  const [busyDates, setBusyDates] = useState<string[]>(initialBusyDates);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setBusyDates(initialBusyDates);
  }, [initialBusyDates]);

  const [viewMonth, setViewMonth] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });

  const calendarDays = useMemo(() => {
    const { year, month } = viewMonth;
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const offset = firstDay === 0 ? 6 : firstDay - 1;
    const days: (number | null)[] = Array(offset).fill(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(d);
    return days;
  }, [viewMonth]);

  const monthLabel = new Date(viewMonth.year, viewMonth.month).toLocaleDateString("ro-RO", { month: "long", year: "numeric" });

  const toDateStr = (day: number) =>
    `${viewMonth.year}-${String(viewMonth.month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const isPast = (day: number) => {
    const d = new Date(viewMonth.year, viewMonth.month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return d < today;
  };

  const prevMonth = () => setViewMonth((v) => (v.month === 0 ? { year: v.year - 1, month: 11 } : { ...v, month: v.month - 1 }));
  const nextMonth = () => setViewMonth((v) => (v.month === 11 ? { year: v.year + 1, month: 0 } : { ...v, month: v.month + 1 }));

  const toggleBusy = useCallback(async (dateStr: string) => {
    if (saving) return;
    setSaving(true);
    try {
      if (busyDates.includes(dateStr)) {
        await photographersApi.removeAvailability(photographerId, dateStr);
        setBusyDates((prev) => prev.filter((d) => d !== dateStr));
      } else {
        await photographersApi.setAvailability({ photographerId, date: dateStr, type: "Busy" });
        setBusyDates((prev) => [...prev, dateStr]);
      }
    } catch {
      // silently fail — dates stay unchanged
    }
    setSaving(false);
  }, [busyDates, photographerId, saving]);

  return {
    user,
    isAdmin,
    busyDates,
    saving,
    calendarDays,
    monthLabel,
    toDateStr,
    isPast,
    prevMonth,
    nextMonth,
    toggleBusy,
  };
}

export type Availability = ReturnType<typeof useAvailability>;
