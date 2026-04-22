import { useMemo, useState } from "react";
import { photographers } from "../../data/mock";
import type { AvailabilityNotification } from "../../components/availability/useAvailability";

export interface AdminBooking {
  id: string;
  clientName: string;
  clientEmail: string;
  photographerId: string;
  photographerName: string;
  date: string;
  timestamp: number;
}

function loadAllBookings(): AdminBooking[] {
  const bookings: AdminBooking[] = [];
  for (const p of photographers) {
    const raw = localStorage.getItem(`lumina_notif_${p.id}`);
    if (!raw) continue;
    const notifs = JSON.parse(raw) as AvailabilityNotification[];
    for (const n of notifs) {
      bookings.push({
        id: n.id,
        clientName: n.clientName,
        clientEmail: n.clientEmail,
        photographerId: p.id,
        photographerName: p.name,
        date: n.date,
        timestamp: n.timestamp,
      });
    }
  }
  return bookings;
}

export function useAdminBookings() {
  const [filterPhotographer, setFilterPhotographer] = useState("all");
  const [sortField, setSortField] = useState<"date" | "timestamp">("timestamp");
  const [sortAsc, setSortAsc] = useState(false);
  const [revision, setRevision] = useState(0);

  const allBookings = useMemo(() => loadAllBookings(), [revision]);

  const filtered = useMemo(() => {
    let list = allBookings;
    if (filterPhotographer !== "all") {
      list = list.filter((b) => b.photographerId === filterPhotographer);
    }
    return list.sort((a, b) => {
      const cmp = sortField === "date"
        ? a.date.localeCompare(b.date)
        : a.timestamp - b.timestamp;
      return sortAsc ? cmp : -cmp;
    });
  }, [allBookings, filterPhotographer, sortField, sortAsc]);

  const toggleSort = (field: "date" | "timestamp") => {
    if (sortField === field) {
      setSortAsc((v) => !v);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const cancelBooking = (booking: AdminBooking) => {
    const notifKey = `lumina_notif_${booking.photographerId}`;
    const bookedKey = `lumina_booked_${booking.photographerId}`;
    const busyKey = `lumina_busy_${booking.photographerId}`;

    const notifs = JSON.parse(localStorage.getItem(notifKey) || "[]") as AvailabilityNotification[];
    localStorage.setItem(notifKey, JSON.stringify(notifs.filter((n) => n.id !== booking.id)));

    const booked = JSON.parse(localStorage.getItem(bookedKey) || "[]") as string[];
    localStorage.setItem(bookedKey, JSON.stringify(booked.filter((d) => d !== booking.date)));

    const busy = JSON.parse(localStorage.getItem(busyKey) || "[]") as string[];
    localStorage.setItem(busyKey, JSON.stringify(busy.filter((d) => d !== booking.date)));

    setRevision((v) => v + 1);
  };

  return {
    bookings: filtered,
    totalCount: allBookings.length,
    filterPhotographer,
    setFilterPhotographer,
    sortField,
    sortAsc,
    toggleSort,
    cancelBooking,
    photographers,
  };
}
