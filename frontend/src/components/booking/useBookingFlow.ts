import { useEffect, useMemo, useState } from "react";
import { photographersApi, bookingsApi } from "../../api";
import { useFetch } from "../../hooks/useFetch";
import type { PhotographerDto, ServicePackageDto } from "../../api/types";

export function useBookingFlow(preselectedPackage: ServicePackageDto | null) {
  const { data: photographers } = useFetch(() => photographersApi.list(), []);
  const [selectedPhotographer, setSelectedPhotographer] = useState<PhotographerDto | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedPackage, setSelectedPackage] = useState<ServicePackageDto | null>(null);
  const [peopleCount, setPeopleCount] = useState(1);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (photographers && photographers.length > 0 && !selectedPhotographer) {
      setSelectedPhotographer(photographers[0]);
    }
  }, [photographers, selectedPhotographer]);

  useEffect(() => {
    if (preselectedPackage) setSelectedPackage(preselectedPackage);
  }, [preselectedPackage]);

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

  const monthLabel = new Date(viewMonth.year, viewMonth.month).toLocaleDateString("ro-RO", {
    month: "long",
    year: "numeric",
  });

  const toDateStr = (day: number) =>
    `${viewMonth.year}-${String(viewMonth.month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const isBusy = (day: number) => selectedPhotographer?.busyDates.includes(toDateStr(day)) ?? false;

  const isPast = (day: number) => {
    const d = new Date(viewMonth.year, viewMonth.month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return d < today;
  };

  const prevMonth = () =>
    setViewMonth((v) => (v.month === 0 ? { year: v.year - 1, month: 11 } : { ...v, month: v.month - 1 }));
  const nextMonth = () =>
    setViewMonth((v) => (v.month === 11 ? { year: v.year + 1, month: 0 } : { ...v, month: v.month + 1 }));

  const canSubmit = Boolean(
    selectedPhotographer && selectedDate && selectedPackage && clientName.trim() && clientEmail.trim() && !submitting
  );

  const handleConfirm = async () => {
    if (!canSubmit || !selectedPhotographer || !selectedPackage) return;
    setSubmitting(true);
    try {
      await bookingsApi.create({
        photographerId: selectedPhotographer.id,
        packageId: selectedPackage.id,
        date: selectedDate,
        peopleCount,
        clientName: clientName.trim(),
        clientEmail: clientEmail.trim(),
      });
      setModalOpen(true);
    } catch {
      // error handled by caller or toast
    } finally {
      setSubmitting(false);
    }
  };

  const changePhotographer = (p: PhotographerDto) => {
    setSelectedPhotographer(p);
    setSelectedDate("");
  };

  return {
    photographers: photographers ?? [],
    selectedPhotographer,
    changePhotographer,
    selectedDate,
    setSelectedDate,
    selectedPackage,
    setSelectedPackage,
    peopleCount,
    setPeopleCount,
    clientName,
    setClientName,
    clientEmail,
    setClientEmail,
    modalOpen,
    setModalOpen,
    calendarDays,
    monthLabel,
    toDateStr,
    isBusy,
    isPast,
    prevMonth,
    nextMonth,
    canSubmit,
    handleConfirm,
    submitting,
  };
}

export type BookingFlow = ReturnType<typeof useBookingFlow>;
