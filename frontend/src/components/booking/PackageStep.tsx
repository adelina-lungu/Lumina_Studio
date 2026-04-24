import { Package, Users } from "lucide-react";
import { packagesApi } from "../../api";
import { useFetch } from "../../hooks/useFetch";
import type { ServicePackageDto } from "../../api/types";
import BookingSection from "./BookingSection";

interface Props {
  selectedPackage: ServicePackageDto | null;
  onSelectPackage: (pkg: ServicePackageDto) => void;
  peopleCount: number;
  setPeopleCount: (updater: (c: number) => number) => void;
}

export default function PackageStep({ selectedPackage, onSelectPackage, peopleCount, setPeopleCount }: Props) {
  const { data: servicePackages } = useFetch(() => packagesApi.list(), []);
  const packages = servicePackages ?? [];

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      <BookingSection icon={<Package size={15} />} title="Alege Pachetul">
        <div className="flex flex-col gap-2.5">
          {packages.map((pkg) => {
            const isActive = selectedPackage?.id === pkg.id;
            return (
              <button
                type="button"
                key={pkg.id}
                onClick={() => onSelectPackage(pkg)}
                className={`flex w-full cursor-pointer items-center justify-between rounded-lg border px-4 py-3 text-left transition-all duration-300 ${
                  isActive ? "border-gold-400/60 bg-gold-400/5" : "border-stone-800 bg-stone-950/40 hover:border-stone-700"
                }`}
              >
                <div className="min-w-0 mr-3">
                  <p className="text-sm font-semibold text-stone-100">{pkg.name}</p>
                  <p className="mt-0.5 text-xs text-stone-500 truncate">
                    {pkg.features[0]} &middot; {pkg.features[2]}
                  </p>
                </div>
                <span className={`shrink-0 font-serif text-lg font-bold ${isActive ? "text-gold-400" : "text-stone-400"}`}>
                  {pkg.currency}{pkg.price}
                </span>
              </button>
            );
          })}
        </div>
      </BookingSection>

      <BookingSection icon={<Users size={15} />} title="Număr de Persoane">
        <div className="flex flex-col items-center justify-center gap-3 py-3">
          <span className="font-serif text-4xl font-bold text-stone-100">{peopleCount}</span>
          <p className="text-xs text-stone-500">{peopleCount === 1 ? "persoană" : "persoane"}</p>
          <div className="flex items-center gap-2.5">
            <CounterButton onClick={() => setPeopleCount((c) => Math.max(1, c - 1))} label="Scade numărul de persoane">−</CounterButton>
            <CounterButton onClick={() => setPeopleCount((c) => Math.min(20, c + 1))} label="Crește numărul de persoane">+</CounterButton>
          </div>
        </div>
      </BookingSection>
    </div>
  );
}

function CounterButton({ onClick, label, children }: { onClick: () => void; label: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-stone-700 text-lg text-stone-400 transition-all hover:border-gold-400/50 hover:text-gold-400"
    >
      {children}
    </button>
  );
}
