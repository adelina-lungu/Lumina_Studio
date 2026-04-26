import { Link } from "react-router-dom";
import { MapPin, Phone, Clock, ArrowRight } from "lucide-react";
import { ROUTES } from "../../../constants";

const items = [
  { icon: MapPin, label: "Adresă", value: "Str. Studenților 9/11, Chișinău" },
  { icon: Phone, label: "Telefon", value: "+373 60 123 456" },
  { icon: Clock, label: "Program", value: "Lun — Vin: 09:00 — 19:00" },
];

export default function ContactTeaser() {
  return (
    <section className="px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto w-full max-w-4xl text-center">
        <p className="mb-3 text-sm font-medium tracking-[0.3em] uppercase text-gold-400">
          Contact
        </p>
        <h2 className="font-serif text-3xl font-semibold text-stone-100 sm:text-4xl">
          Hai Să Discutăm
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-stone-500">
          Ai întrebări sau vrei să te programezi? Contactează-ne prin formularul nostru sau fă o vizită la studioul nostru.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {items.map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-lg border border-stone-800 bg-stone-900/30 px-5 py-6 transition-all duration-300 hover:border-stone-700">
              <Icon size={18} className="mx-auto mb-3 text-gold-400" />
              <p className="text-xs font-medium tracking-wide uppercase text-stone-500">{label}</p>
              <p className="mt-1.5 text-sm font-medium text-stone-200">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Link
            to={ROUTES.contact}
            className="group inline-flex items-center gap-2 rounded-lg border border-gold-400/40 bg-gold-400/10 px-6 py-3 text-sm font-medium tracking-widest uppercase text-gold-400 transition-all duration-300 hover:border-gold-400 hover:bg-gold-400/20"
          >
            Contactează-ne
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
