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
  const { user } = useAuth();

  const [editName, setEditName] = useState(user?.name ?? "");
  const [editPhone, setEditPhone] = useState(user?.phone ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const bookings = user ? loadBookings(user.email) : [];

  const hasChanges = user ? editName !== user.name || editPhone !== user.phone : false;

  const save = () => {
    if (!user || !editName.trim()) return;
    setSaving(true);

    const usersRaw = localStorage.getItem("lumina_users") || "[]";
    const users = JSON.parse(usersRaw) as Array<{ name: string; email: string; phone: string; password: string; role: string }>;
    const idx = users.findIndex((u) => u.email === user.email);
    if (idx !== -1) {
      users[idx].name = editName.trim();
      users[idx].phone = editPhone.trim();
      localStorage.setItem("lumina_users", JSON.stringify(users));
    }

    const updated = { ...user, name: editName.trim(), phone: editPhone.trim() };
    localStorage.setItem("lumina_user", JSON.stringify(updated));
    window.location.reload();
  };

  return {
    user,
    editName,
    setEditName,
    editPhone,
    setEditPhone,
    saving,
    saved,
    hasChanges,
    save,
    bookings,
  };
}
