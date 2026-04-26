import { Calendar, Lock } from "lucide-react";
import { useAvailability } from "./useAvailability";
import CalendarGrid from "./CalendarGrid";

interface AvailabilityCalendarProps {
  photographerId: number;
  photographerName: string;
  initialBusyDates: string[];
}

export default function AvailabilityCalendar({ photographerId, photographerName, initialBusyDates }: AvailabilityCalendarProps) {
  const a = useAvailability(photographerId, initialBusyDates);

  const handleDayClick = (dateStr: string) => {
    if (a.isAdmin) {
      a.toggleBusy(dateStr);
    }
  };

  return (
    <div className="rounded-lg border border-stone-800 bg-stone-900/30 overflow-hidden">
      <div className="flex items-center justify-between border-b border-stone-800 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-gold-400" />
          <h3 className="text-sm font-semibold tracking-wide uppercase text-stone-200">
            {a.isAdmin ? "Gestioneaza disponibilitatea" : "Disponibilitate"} — {photographerName}
          </h3>
        </div>
        {a.saving && (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-stone-700 border-t-gold-400" />
        )}
      </div>

      <div className="p-5 sm:p-6">
        {a.isAdmin && (
          <div className="mb-4 rounded-lg border border-gold-400/20 bg-gold-400/5 px-4 py-2.5 text-xs text-gold-400">
            <Lock size={12} className="inline mr-1.5" />
            Mod administrator — apasa pe o zi pentru a o marca ca ocupata/libera.
          </div>
        )}

        <CalendarGrid
          calendarDays={a.calendarDays}
          monthLabel={a.monthLabel}
          prevMonth={a.prevMonth}
          nextMonth={a.nextMonth}
          toDateStr={a.toDateStr}
          isPast={a.isPast}
          busyDates={a.busyDates}
          isAdmin={a.isAdmin}
          onDayClick={handleDayClick}
        />
      </div>
    </div>
  );
}
