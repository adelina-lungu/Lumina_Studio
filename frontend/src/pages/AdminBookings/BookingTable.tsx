import { Camera, Mail, Trash2, User } from "lucide-react";
import type { BookingDto } from "../../api/types";

const STATUS_LABELS: Record<string, { text: string; className: string }> = {
  Pending: { text: "In asteptare", className: "border-amber-500/20 bg-amber-500/10 text-amber-400" },
  Confirmed: { text: "Confirmat", className: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400" },
  Cancelled: { text: "Anulat", className: "border-red-500/20 bg-red-500/10 text-red-400" },
  Completed: { text: "Finalizat", className: "border-blue-500/20 bg-blue-500/10 text-blue-400" },
};

interface Props {
  bookings: BookingDto[];
  onCancel: (booking: BookingDto) => void;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("ro-RO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTimestamp(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("ro-RO", {
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
      {bookings.map((b) => {
        const status = STATUS_LABELS[b.status] ?? STATUS_LABELS.Pending;
        return (
          <div
            key={b.id}
            className="group flex items-center gap-4 rounded-lg border border-stone-800 bg-stone-900/50 px-5 py-4 transition-colors hover:border-stone-700"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-400/10">
              <Camera size={16} className="text-gold-400" />
            </div>

            <div className="flex-1 min-w-0 grid grid-cols-1 gap-1 sm:grid-cols-4 sm:gap-4 sm:items-center">
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

              <span className={`w-fit rounded border px-2.5 py-1 text-[10px] font-medium tracking-wide uppercase ${status.className}`}>
                {status.text}
              </span>

              <p className="text-xs text-stone-600 sm:text-right">
                {formatTimestamp(b.createdOn)}
              </p>
            </div>

            {b.status === "Pending" && (
              <button
                onClick={() => onCancel(b)}
                className="shrink-0 cursor-pointer rounded-lg border border-transparent p-2 text-stone-600 opacity-0 transition-all group-hover:opacity-100 hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-400"
                title="Anuleaza programarea"
              >
                <Trash2 size={15} />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
