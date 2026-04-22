import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import BookingSection from "./BookingSection";
import type { BookingFlow } from "./useBookingFlow";

const WEEKDAYS = ["Lun", "Mar", "Mie", "Joi", "Vin", "Sâm", "Dum"];

type Props = Pick<
  BookingFlow,
  "calendarDays" | "monthLabel" | "prevMonth" | "nextMonth" | "selectedDate" | "setSelectedDate" | "toDateStr" | "isBusy" | "isPast"
>;

export default function CalendarStep({
  calendarDays,
  monthLabel,
  prevMonth,
  nextMonth,
  selectedDate,
  setSelectedDate,
  toDateStr,
  isBusy,
  isPast,
}: Props) {
  return (
    <BookingSection icon={<Calendar size={15} />} title="Selectează Data">
      <div className="mx-auto w-full max-w-md lg:max-w-lg">
        <div className="mb-3 flex items-center justify-between">
          <button type="button" onClick={prevMonth} aria-label="Luna anterioară" className="cursor-pointer rounded p-1.5 text-stone-500 transition-colors hover:bg-stone-800 hover:text-stone-200">
            <ChevronLeft size={16} />
          </button>
          <span className="text-sm font-semibold capitalize tracking-wide text-stone-200">{monthLabel}</span>
          <button type="button" onClick={nextMonth} aria-label="Luna următoare" className="cursor-pointer rounded p-1.5 text-stone-500 transition-colors hover:bg-stone-800 hover:text-stone-200">
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-7 mb-1">
          {WEEKDAYS.map((d) => (
            <div key={d} className="py-1.5 text-center text-[11px] font-semibold uppercase tracking-wider text-stone-600">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, idx) => {
            if (day === null) return <div key={`e-${idx}`} className="h-10" />;
            const busy = isBusy(day);
            const past = isPast(day);
            const disabled = busy || past;
            const dateStr = toDateStr(day);
            const selected = selectedDate === dateStr;

            return (
              <button
                type="button"
                key={`d-${day}`}
                disabled={disabled}
                onClick={() => setSelectedDate(dateStr)}
                className={`relative flex h-10 items-center justify-center rounded text-sm transition-all duration-200 ${
                  selected
                    ? "bg-gold-400 font-bold text-stone-950"
                    : disabled
                      ? "cursor-not-allowed text-stone-700 line-through opacity-40"
                      : "cursor-pointer text-stone-400 hover:bg-stone-800 hover:text-stone-100"
                }`}
              >
                {day}
                {busy && !selected && <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-red-500" />}
              </button>
            );
          })}
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 border-t border-stone-800/50 pt-3 text-[11px] text-stone-500">
          <LegendDot color="bg-red-500" label="Indisponibil" />
          <LegendDot color="bg-gold-400" label="Selectat" />
          <LegendDot color="bg-stone-700" label="Trecut" />
        </div>
      </div>
    </BookingSection>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`inline-block h-1.5 w-1.5 rounded-full ${color}`} />
      {label}
    </span>
  );
}
