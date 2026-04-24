import { useCallback, useEffect, useMemo, useState } from "react";
import { bookingsApi, photographersApi } from "../../api";
import type { BookingDto, PhotographerDto } from "../../api/types";

export function useAdminBookings() {
  const [bookings, setBookings] = useState<BookingDto[]>([]);
  const [photographers, setPhotographers] = useState<PhotographerDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterPhotographer, setFilterPhotographer] = useState("all");
  const [sortField, setSortField] = useState<"date" | "createdOn">("createdOn");
  const [sortAsc, setSortAsc] = useState(false);

  const load = useCallback(async () => {
    try {
      const [bookingRes, photoRes] = await Promise.all([
        bookingsApi.list({}),
        photographersApi.list(),
      ]);
      setBookings(bookingRes.items);
      setPhotographers(photoRes);
    } catch {
      // handled by toast
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = useMemo(() => {
    let list = bookings;
    if (filterPhotographer !== "all") {
      list = list.filter((b) => String(b.photographerId) === filterPhotographer);
    }
    return [...list].sort((a, b) => {
      const cmp = sortField === "date"
        ? a.date.localeCompare(b.date)
        : a.createdOn.localeCompare(b.createdOn);
      return sortAsc ? cmp : -cmp;
    });
  }, [bookings, filterPhotographer, sortField, sortAsc]);

  const toggleSort = (field: "date" | "createdOn") => {
    if (sortField === field) {
      setSortAsc((v) => !v);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const cancelBooking = async (booking: BookingDto) => {
    try {
      await bookingsApi.cancel(booking.id);
      setBookings((prev) => prev.filter((b) => b.id !== booking.id));
    } catch {
      // handled by toast
    }
  };

  return {
    bookings: filtered,
    totalCount: bookings.length,
    loading,
    filterPhotographer,
    setFilterPhotographer,
    sortField,
    sortAsc,
    toggleSort,
    cancelBooking,
    photographers,
  };
}
