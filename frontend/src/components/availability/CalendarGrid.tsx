import { ChevronLeft, ChevronRight } from "lucide-react";

const WEEKDAYS = ["Lun", "Mar", "Mie", "Joi", "Vin", "Sam", "Dum"];

interface Props {
  calendarDays: (number | null)[];
  monthLabel: string;
  prevMonth: () => void;
  nextMonth: () => void;
  toDateStr: (day: number) => string;
  isPast: (day: number) => boolean;
  busyDates: string[];
  isAdmin: boolean;
  onDayClick: (dateStr: string) => void;
}

export default function CalendarGrid({
  calendarDays, monthLabel, prevMonth, nextMonth, toDateStr, isPast, busyDates, isAdmin, onDayClick,
}: Props) {
  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <button onClick={prevMonth} className="cursor-pointer rounded p-1.5 text-stone-500 transition-colors hover:bg-stone-800 hover:text-stone-200">
          <ChevronLeft size={18} />
        </button>
        <span className="text-sm font-semibold capitalize tracking-wide text-stone-200">{monthLabel}</span>
        <button onClick={nextMonth} className="cursor-pointer rounded p-1.5 text-stone-500 transition-colors hover:bg-stone-800 hover:text-stone-200">
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="grid grid-cols-7 mb-2">
        {WEEKDAYS.map((d) => (
          <div key={d} className="py-1 text-center text-[11px] font-semibold uppercase tracking-wider text-stone-600">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {calendarDays.map((day, idx) => {
          if (day === null) return <div key={`e-${idx}`} className="h-11" />;

          const dateStr = toDateStr(day);
          const past = isPast(day);
          const busy = busyDates.includes(dateStr);

          return (
            <button
              key={`d-${day}`}
              disabled={past || (!isAdmin && busy)}
              onClick={() => isAdmin && onDayClick(dateStr)}
              className={`relative flex h-11 items-center justify-center rounded-lg text-sm transition-all duration-200 ${
                busy
                  ? "bg-red-500/10 border border-red-500/20 text-red-400/70"
                  : past
                    ? "text-stone-700 cursor-not-allowed"
                    : isAdmin
                      ? "border border-stone-800 text-stone-300 cursor-pointer hover:border-green-500/30 hover:bg-green-500/5 hover:text-green-400"
                      : "border border-stone-800 text-stone-300"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 border-t border-stone-800/50 pt-4 text-[11px] text-stone-500">
        <LegendChip className="border-red-500/30 bg-red-500/10" label="Ocupat" />
        <LegendChip className="border-stone-700 bg-stone-900" label="Disponibil" />
      </div>
    </>
  );
}

function LegendChip({ className, label }: { className: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`inline-block h-2.5 w-2.5 rounded border ${className}`} />
      {label}
    </span>
  );
}
