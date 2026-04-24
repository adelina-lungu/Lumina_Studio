import { Calendar, Camera } from "lucide-react";

export interface ProfileBooking {
  id: string;
  photographerName: string;
  date: string;
  timestamp: number;
}

interface Props {
  bookings: ProfileBooking[];
}

export default function BookingHistory({ bookings }: Props) {
  return (
    <section className="mx-auto w-full max-w-2xl px-6 pb-16">
      <h2 className="mb-6 text-sm font-medium tracking-[0.2em] uppercase text-stone-500">Programarile mele</h2>

      {bookings.length === 0 ? (
        <div className="rounded-lg border border-dashed border-stone-800 px-6 py-10 text-center">
          <Calendar size={28} className="mx-auto mb-3 text-stone-700" />
          <p className="text-sm text-stone-500">Nu ai nicio programare inca.</p>
          <p className="mt-1 text-xs text-stone-600">Exploreaza portofoliul si programeaza o sedinta foto!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {bookings.map((b) => (
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
              <span className="shrink-0 rounded bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-[10px] font-medium tracking-wide uppercase text-emerald-400">
                Confirmat
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
