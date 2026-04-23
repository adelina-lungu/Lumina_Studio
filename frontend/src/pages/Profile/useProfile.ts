import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import type { AvailabilityNotification } from "../../components/availability/useAvailability";
import { photographers } from "../../data/mock";

export interface ProfileBooking {
  id: string;
  photographerName: string;
  date: string;
  timestamp: number;
}

function loadBookings(email: string): ProfileBooking[] {
  const bookings: ProfileBooking[] = [];
  for (const p of photographers) {
    const raw = localStorage.getItem(`lumina_notif_${p.id}`);
    if (!raw) continue;
    const notifs = JSON.parse(raw) as AvailabilityNotification[];
    for (const n of notifs) {
      if (n.clientEmail === email) {
        bookings.push({
          id: n.id,
          photographerName: p.name,
          date: n.date,
          timestamp: n.timestamp,
        });
      }
    }
  }
  return bookings.sort((a, b) => b.timestamp - a.timestamp);
}

export function useProfile() {
  const { user, updateUser } = useAuth();

  const [editName, setEditName] = useState(user?.name ?? "");
  const [editPhone, setEditPhone] = useState(user?.phone ?? "");
  const [saved, setSaved] = useState(false);

  const bookings = user ? loadBookings(user.email) : [];

  const hasChanges = user ? editName !== user.name || editPhone !== user.phone : false;

  const save = () => {
    if (!user || !editName.trim()) return;
    updateUser({ name: editName.trim(), phone: editPhone.trim() });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return {
    user,
    editName,
    setEditName,
    editPhone,
    setEditPhone,
    saved,
    hasChanges,
    save,
    bookings,
  };
}
