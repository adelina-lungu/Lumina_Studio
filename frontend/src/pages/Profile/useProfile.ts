import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { bookingsApi } from "../../api";
import { useFetch } from "../../hooks/useFetch";

export function useProfile() {
  const { user, updateUser } = useAuth();

  const [editName, setEditName] = useState(user?.name ?? "");
  const [editPhone, setEditPhone] = useState(user?.phone ?? "");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const { data: bookings, loading: bookingsLoading } = useFetch(
    () => bookingsApi.myBookings(),
    [],
  );

  const hasChanges = user ? editName !== user.name || editPhone !== user.phone : false;

  const save = async () => {
    if (!user || !editName.trim()) return;
    setError("");
    const err = await updateUser({ name: editName.trim(), phone: editPhone.trim() });
    if (err) {
      setError(err);
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  return {
    user,
    editName,
    setEditName,
    editPhone,
    setEditPhone,
    saved,
    error,
    hasChanges,
    save,
    bookings: bookings ?? [],
    bookingsLoading,
  };
}
