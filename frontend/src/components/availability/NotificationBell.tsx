import { useState } from "react";
import { Bell } from "lucide-react";
import type { AvailabilityNotification } from "./useAvailability";

interface Props {
  notifications: AvailabilityNotification[];
  onClear: () => void;
}

export default function NotificationBell({ notifications, onClear }: Props) {
  const [open, setOpen] = useState(false);
  const unreadCount = notifications.length;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative flex cursor-pointer items-center justify-center h-9 w-9 rounded-full border border-stone-700 text-stone-400 transition-all hover:border-gold-400/50 hover:text-gold-400"
      >
        <Bell size={16} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold-400 text-[10px] font-bold text-stone-950">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 rounded-lg border border-stone-800 bg-stone-900 shadow-xl z-50">
          <div className="flex items-center justify-between border-b border-stone-800 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-stone-200">Rezervari noi</p>
            {unreadCount > 0 && (
              <button onClick={() => { onClear(); setOpen(false); }} className="cursor-pointer text-xs text-stone-500 hover:text-gold-400">
                Sterge tot
              </button>
            )}
          </div>
          <div className="max-h-64 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="px-4 py-6 text-center text-sm text-stone-600">Nicio rezervare noua</p>
            ) : (
              notifications.map((n) => (
                <div key={n.id} className="border-b border-stone-800/50 px-4 py-3 last:border-none">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-stone-200">{n.clientName}</p>
                    <span className="text-[10px] text-stone-600">
                      {new Date(n.timestamp).toLocaleTimeString("ro-RO", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-stone-500">{n.clientEmail}</p>
                  <p className="mt-1 text-xs text-gold-400">
                    Rezervare: {new Date(n.date + "T00:00:00").toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
