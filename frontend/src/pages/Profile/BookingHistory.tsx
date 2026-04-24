import { Calendar, Camera } from "lucide-react";
import type { BookingDto } from "../../api/types";

const STATUS_LABELS: Record<string, { text: string; className: string }> = {
  Pending: { text: "In asteptare", className: "border-amber-500/20 bg-amber-500/10 text-amber-400" },
  Confirmed: { text: "Confirmat", className: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400" },
  Cancelled: { text: "Anulat", className: "border-red-500/20 bg-red-500/10 text-red-400" },
  Completed: { text: "Finalizat", className: "border-blue-500/20 bg-blue-500/10 text-blue-400" },
};

interface Props {
  bookings: BookingDto[];
  loading: boolean;
}

export default function BookingHistory({ bookings, loading }: Props) {
  return (
    <section className="mx-auto w-full max-w-2xl px-6 pb-16">
      <h2 className="mb-6 text-sm font-medium tracking-[0.2em] uppercase text-stone-500">Programarile mele</h2>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="animate-pulse rounded-lg border border-stone-800 bg-stone-900/50 px-5 py-5">
              <div className="h-4 w-1/2 rounded bg-stone-800" />
            </div>
          ))}
        </div>
      ) : bookings.length === 0 ? (
        <div className="rounded-lg border border-dashed border-stone-800 px-6 py-10 text-center">
          <Calendar size={28} className="mx-auto mb-3 text-stone-700" />
          <p className="text-sm text-stone-500">Nu ai nicio programare inca.</p>
          <p className="mt-1 text-xs text-stone-600">Exploreaza portofoliul si programeaza o sedinta foto!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {bookings.map((b) => {
            const status = STATUS_LABELS[b.status] ?? STATUS_LABELS.Pending;
            return (
              <div
                key={b.id}
                className="flex items-center gap-4 rounded-lg border border-stone-800 bg-stone-900/50 px-5 py-4 transition-colors hover:border-stone-700"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-400/10">
                  <Camera size={16} className="text-gold-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-stone-100">{b.photographerName}</p>
                  <p className="text-xs text-stone-500">
                    {new Date(b.date).toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                </div>
                <span className={`shrink-0 rounded border px-2.5 py-1 text-[10px] font-medium tracking-wide uppercase ${status.className}`}>
                  {status.text}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
