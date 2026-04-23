import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ArrowRight, Clock, MapPin, Phone } from "lucide-react";
import { BOOKING_LINK, MENU_LINKS } from "../../constants";

interface MenuOverlayProps {
  open: boolean;
  onClose: () => void;
  onBookingClick: () => void;
}

export default function MenuOverlay({ open, onClose, onBookingClick }: MenuOverlayProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const itemStyle = (i: number) => ({
    transitionDelay: open ? `${150 + i * 80}ms` : "0ms",
    transitionDuration: "600ms",
  });

  return (
    <div className={`fixed inset-0 z-[55] transition-all duration-700 ${open ? "visible" : "invisible"}`}>
      <div className={`absolute inset-0 bg-stone-950/60 backdrop-blur-md transition-opacity duration-700 ${open ? "opacity-100" : "opacity-0"}`} />
      <div className="relative z-10 flex h-full flex-col justify-center px-6 md:px-10">
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1fr_380px] lg:gap-16">
            <nav className="flex flex-col">
              {MENU_LINKS.map((link, i) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={onClose}
                  className={`group flex cursor-pointer items-center gap-4 border-b border-gold-400/15 py-4 text-left transition-all sm:gap-6 sm:py-5 ${open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
                  style={itemStyle(i)}
                >
                  <span className="text-xs font-medium tracking-wider text-gold-400/40 transition-colors group-hover:text-gold-400 sm:text-sm">
                    {link.number}
                  </span>
                  <span className="font-serif text-3xl font-semibold text-stone-300 transition-all duration-300 group-hover:text-stone-50 group-hover:translate-x-2 sm:text-4xl lg:text-5xl">
                    {link.label}
                  </span>
                  <ArrowRight size={20} className="ml-auto text-stone-700 transition-all duration-300 group-hover:text-gold-400 group-hover:translate-x-1 opacity-0 group-hover:opacity-100" />
                </NavLink>
              ))}

              <button
                onClick={() => { onClose(); onBookingClick(); }}
                className={`group flex cursor-pointer items-center gap-4 border-t border-gold-400/15 py-5 mt-1 text-left transition-all sm:gap-6 ${open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
                style={itemStyle(MENU_LINKS.length)}
              >
                <span className="text-xs font-medium tracking-wider text-gold-400 sm:text-sm">{BOOKING_LINK.number}</span>
                <span className="font-serif text-3xl font-semibold text-gold-400 transition-all duration-300 group-hover:translate-x-2 sm:text-4xl lg:text-5xl">
                  {BOOKING_LINK.label}
                </span>
                <ArrowRight size={20} className="ml-auto text-gold-400/50 transition-all duration-300 group-hover:text-gold-400 group-hover:translate-x-1 opacity-0 group-hover:opacity-100" />
              </button>
            </nav>

            <aside className={`hidden lg:flex flex-col justify-center transition-all duration-700 ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: open ? "500ms" : "0ms" }}>
              <div className="rounded-lg border border-gold-400/15 bg-stone-900/40 p-8">
                <p className="text-xs font-medium tracking-[0.3em] uppercase text-gold-400 mb-3">Studio Foto</p>
                <p className="text-sm leading-relaxed text-stone-400">
                  Servicii foto premium in Chisinau. Transformam fiecare moment in arta vizuala de exceptie.
                </p>
                <div className="my-6 h-px bg-gradient-to-r from-gold-400/20 via-gold-400/10 to-transparent" />
                <div className="flex flex-col gap-4">
                  <InfoRow icon={<MapPin size={15} className="mt-0.5 shrink-0 text-gold-400/60" />} label="Adresa" value="Str. Studentilor 9/11, Chisinau" />
                  <InfoRow icon={<Phone size={15} className="mt-0.5 shrink-0 text-gold-400/60" />} label="Telefon" value="+373 60 123 456" />
                  <InfoRow icon={<Clock size={15} className="mt-0.5 shrink-0 text-gold-400/60" />} label="Program" value="Luni — Vineri: 09:00 — 19:00" />
                </div>
                <div className="my-6 h-px bg-gradient-to-r from-gold-400/20 via-gold-400/10 to-transparent" />
                <p className="text-[11px] text-stone-600">&copy; 2026 Lumina Studio</p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      {icon}
      <div>
        <p className="text-[10px] font-medium tracking-wide uppercase text-stone-600">{label}</p>
        <p className="text-sm text-stone-300 mt-0.5">{value}</p>
      </div>
    </div>
  );
}
