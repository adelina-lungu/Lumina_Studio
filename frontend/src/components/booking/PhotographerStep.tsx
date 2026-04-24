import { Camera } from "lucide-react";
import type { PhotographerDto } from "../../api/types";
import BookingSection from "./BookingSection";

interface Props {
  photographers: PhotographerDto[];
  selected: PhotographerDto | null;
  onChange: (p: PhotographerDto) => void;
}

export default function PhotographerStep({ photographers, selected, onChange }: Props) {
  return (
    <BookingSection icon={<Camera size={15} />} title="Alege Fotograful">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {photographers.map((p) => {
          const isActive = selected?.id === p.id;
          return (
            <button
              type="button"
              key={p.id}
              onClick={() => onChange(p)}
              className={`group flex items-center gap-3 rounded-lg border px-3 py-3 transition-all duration-300 cursor-pointer text-left sm:flex-col sm:items-center sm:text-center sm:px-4 sm:py-5 ${
                isActive
                  ? "border-gold-400/60 bg-gold-400/5"
                  : "border-stone-800 bg-stone-950/40 hover:border-stone-700 hover:bg-stone-900/60"
              }`}
            >
              <img
                src={p.avatarUrl}
                alt={p.name}
                className={`h-10 w-10 shrink-0 rounded-full object-cover ring-2 transition-all duration-300 sm:h-14 sm:w-14 ${
                  isActive ? "ring-gold-400/60" : "ring-stone-800 group-hover:ring-stone-700"
                }`}
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold leading-tight text-stone-100">{p.name}</p>
                <p className="mt-0.5 text-xs text-stone-500">{p.specialty}</p>
              </div>
              <span
                className={`ml-auto shrink-0 rounded px-3 py-1 text-[10px] font-semibold tracking-wider uppercase transition-all duration-300 sm:ml-0 sm:mt-2 sm:w-full sm:py-1.5 sm:text-center sm:text-[11px] ${
                  isActive
                    ? "bg-gold-400 text-stone-950"
                    : "border border-stone-700 text-stone-500 group-hover:border-gold-400/40 group-hover:text-gold-400"
                }`}
              >
                {isActive ? "Selectat" : "Selectează"}
              </span>
            </button>
          );
        })}
      </div>
    </BookingSection>
  );
}
