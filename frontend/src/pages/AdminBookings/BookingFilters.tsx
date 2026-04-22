import { ArrowUpDown, Filter } from "lucide-react";
import type { Photographer } from "../../types";

interface Props {
  photographers: Photographer[];
  filterPhotographer: string;
  setFilterPhotographer: (v: string) => void;
  sortField: "date" | "timestamp";
  sortAsc: boolean;
  toggleSort: (field: "date" | "timestamp") => void;
  totalCount: number;
  shownCount: number;
}

export default function BookingFilters({
  photographers,
  filterPhotographer,
  setFilterPhotographer,
  sortField,
  sortAsc,
  toggleSort,
  totalCount,
  shownCount,
}: Props) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <Filter size={14} className="text-stone-500" />
        <select
          value={filterPhotographer}
          onChange={(e) => setFilterPhotographer(e.target.value)}
          className="rounded-lg border border-stone-800 bg-stone-900 px-3 py-2 text-sm text-stone-300 outline-none transition-colors focus:border-gold-400/50"
        >
          <option value="all">Toti fotografii</option>
          {photographers.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        <span className="text-xs text-stone-600">
          {shownCount} din {totalCount} programari
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => toggleSort("date")}
          className={`flex cursor-pointer items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium tracking-wide uppercase transition-colors ${
            sortField === "date" ? "border-gold-400/30 bg-gold-400/10 text-gold-400" : "border-stone-800 text-stone-500 hover:text-stone-300"
          }`}
        >
          <ArrowUpDown size={12} />
          Data {sortField === "date" && (sortAsc ? "↑" : "↓")}
        </button>
        <button
          onClick={() => toggleSort("timestamp")}
          className={`flex cursor-pointer items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium tracking-wide uppercase transition-colors ${
            sortField === "timestamp" ? "border-gold-400/30 bg-gold-400/10 text-gold-400" : "border-stone-800 text-stone-500 hover:text-stone-300"
          }`}
        >
          <ArrowUpDown size={12} />
          Recente {sortField === "timestamp" && (sortAsc ? "↑" : "↓")}
        </button>
      </div>
    </div>
  );
}
