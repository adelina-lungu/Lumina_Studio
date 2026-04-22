import { Camera, Mail, Trash2, User } from "lucide-react";
import type { AdminBooking } from "./useAdminBookings";

interface Props {
  bookings: AdminBooking[];
  onCancel: (booking: AdminBooking) => void;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("ro-RO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTimestamp(ts: number) {
  return new Date(ts).toLocaleDateString("ro-RO", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function BookingTable({ bookings, onCancel }: Props) {
  if (bookings.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-stone-800 px-6 py-14 text-center">
        <Camera size={32} className="mx-auto mb-3 text-stone-700" />
        <p className="text-sm text-stone-500">Nicio programare gasita.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {bookings.map((b) => (
        <div
          key={b.id}
          className="group flex items-center gap-4 rounded-lg border border-stone-800 bg-stone-900/50 px-5 py-4 transition-colors hover:border-stone-700"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-400/10">
            <Camera size={16} className="text-gold-400" />
          </div>

          <div className="flex-1 min-w-0 grid grid-cols-1 gap-1 sm:grid-cols-3 sm:gap-4 sm:items-center">
            <div>
              <p className="flex items-center gap-1.5 text-sm font-medium text-stone-100">
                <User size={12} className="text-stone-500" />
                {b.clientName}
              </p>
              <p className="flex items-center gap-1.5 text-xs text-stone-500">
                <Mail size={10} />
                {b.clientEmail}
              </p>
            </div>

            <div className="text-sm">
              <p className="text-stone-300">{b.photographerName}</p>
              <p className="text-xs text-stone-500">{formatDate(b.date)}</p>
            </div>

            <p className="text-xs text-stone-600 sm:text-right">
              Inregistrat: {formatTimestamp(b.timestamp)}
            </p>
          </div>

          <button
            onClick={() => onCancel(b)}
            className="shrink-0 cursor-pointer rounded-lg border border-transparent p-2 text-stone-600 opacity-0 transition-all group-hover:opacity-100 hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-400"
            title="Anuleaza programarea"
          >
            <Trash2 size={15} />
          </button>
        </div>
      ))}
    </div>
  );
}
