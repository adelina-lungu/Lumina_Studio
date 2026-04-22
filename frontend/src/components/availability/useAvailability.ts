import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

export interface AvailabilityNotification {
  id: string;
  clientName: string;
  clientEmail: string;
  date: string;
  photographerId: string;
  timestamp: number;
}

const readLS = <T,>(key: string, fallback: T): T => {
  const saved = localStorage.getItem(key);
  return saved ? (JSON.parse(saved) as T) : fallback;
};

export function useAvailability(photographerId: string, initialBusyDates: string[]) {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const busyKey = `lumina_busy_${photographerId}`;
  const bookedKey = `lumina_booked_${photographerId}`;
  const notifKey = `lumina_notif_${photographerId}`;

  const [busyDates, setBusyDates] = useState<string[]>(() => readLS(busyKey, initialBusyDates));
  const [bookedDates, setBookedDates] = useState<string[]>(() => readLS<string[]>(bookedKey, []));
  const [notifications, setNotifications] = useState<AvailabilityNotification[]>(() =>
    readLS<AvailabilityNotification[]>(notifKey, [])
  );

  useEffect(() => { localStorage.setItem(busyKey, JSON.stringify(busyDates)); }, [busyDates, busyKey]);
  useEffect(() => { localStorage.setItem(bookedKey, JSON.stringify(bookedDates)); }, [bookedDates, bookedKey]);
  useEffect(() => { localStorage.setItem(notifKey, JSON.stringify(notifications)); }, [notifications, notifKey]);

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

  const toggleBusy = (dateStr: string) => {
    if (busyDates.includes(dateStr)) {
      setBusyDates((prev) => prev.filter((d) => d !== dateStr));
    } else {
      setBusyDates((prev) => [...prev, dateStr]);
      setBookedDates((prev) => prev.filter((d) => d !== dateStr));
    }
  };

  const bookDate = (dateStr: string) => {
    if (!user) return;
    setBookedDates((prev) => [...prev, dateStr]);
    setBusyDates((prev) => [...prev, dateStr]);
    setNotifications((prev) => [
      {
        id: Date.now().toString(),
        clientName: user.name,
        clientEmail: user.email,
        date: dateStr,
        photographerId,
        timestamp: Date.now(),
      },
      ...prev,
    ]);
  };

  const clearNotifications = () => setNotifications([]);

  return {
    user,
    isAdmin,
    busyDates,
    bookedDates,
    notifications,
    calendarDays,
    monthLabel,
    toDateStr,
    isPast,
    prevMonth,
    nextMonth,
    toggleBusy,
    bookDate,
    clearNotifications,
  };
}

export type Availability = ReturnType<typeof useAvailability>;
