import { useState, useEffect, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  User,
  Users,
  Calendar,
  Camera,
  Package,
  Mail,
  CheckCircle2,
} from "lucide-react";
import { photographers, servicePackages } from "../data/mock";
import type { Photographer, ServicePackage } from "../data/mock";
import BookingModal from "./BookingModal";

interface BookingProps {
  preselectedPackage: ServicePackage | null;
}

/* ─────────────────────────────────────────────
   Section wrapper — compact bordered block
   ───────────────────────────────────────────── */
function BookingSection({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-stone-800 bg-stone-900/30">
      <div className="flex items-center gap-2 border-b border-stone-800 px-4 py-3 sm:px-5">
        <span className="text-gold-400">{icon}</span>
        <h3 className="text-xs font-semibold tracking-wide uppercase text-stone-200">
          {title}
        </h3>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Summary row
   ───────────────────────────────────────────── */
function SummaryRow({
  label,
  value,
  dimmed = false,
}: {
  label: string;
  value: string;
  dimmed?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3 text-sm">
      <span className="shrink-0 text-stone-500">{label}</span>
      <span
        className={`text-right truncate ${
          dimmed ? "italic text-stone-600" : "font-medium text-stone-200"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Booking component
   ───────────────────────────────────────────── */
export default function Booking({ preselectedPackage }: BookingProps) {
  const [selectedPhotographer, setSelectedPhotographer] =
    useState<Photographer>(photographers[0]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedPackage, setSelectedPackage] = useState<ServicePackage | null>(
    null
  );
  const [peopleCount, setPeopleCount] = useState(1);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (preselectedPackage) setSelectedPackage(preselectedPackage);
  }, [preselectedPackage]);

  /* ── Calendar logic ── */
  const [viewMonth, setViewMonth] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });

  const calendarDays = useMemo(() => {
    const { year, month } = viewMonth;
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const offset = firstDay === 0 ? 6 : firstDay - 1;
    const days: (number | null)[] = Array(offset).fill(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(d);
    return days;
  }, [viewMonth]);

  const monthLabel = new Date(
    viewMonth.year,
    viewMonth.month
  ).toLocaleDateString("ro-RO", { month: "long", year: "numeric" });

  const toDateStr = (day: number) =>
    `${viewMonth.year}-${String(viewMonth.month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const isBusy = (day: number) =>
    selectedPhotographer.busyDates.includes(toDateStr(day));

  const isPast = (day: number) => {
    const d = new Date(viewMonth.year, viewMonth.month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return d < today;
  };

  const prevMonth = () =>
    setViewMonth((v) =>
      v.month === 0
        ? { year: v.year - 1, month: 11 }
        : { ...v, month: v.month - 1 }
    );
  const nextMonth = () =>
    setViewMonth((v) =>
      v.month === 11
        ? { year: v.year + 1, month: 0 }
        : { ...v, month: v.month + 1 }
    );

  const canSubmit =
    selectedPhotographer &&
    selectedDate &&
    selectedPackage &&
    clientName.trim() &&
    clientEmail.trim();

  const handleConfirm = () => {
    if (canSubmit) setModalOpen(true);
  };

  return (
    <>
      <section
        id="booking"
        className="px-6 py-20 md:px-10 md:py-28"
      >
        {/* Fluid container: scales from 1080p to ultrawide */}
        <div className="mx-auto w-full max-w-6xl">
          {/* ── Section heading ── */}
          <div className="mb-10 text-center md:mb-12">
            <p className="mb-3 text-sm font-medium tracking-[0.3em] uppercase text-gold-400">
              Rezervă Ședința
            </p>
            <h2 className="font-serif text-3xl font-semibold text-stone-100 sm:text-4xl md:text-5xl">
              Programare Online
            </h2>
          </div>

          {/* ══════════════════════════════════════
             MAIN GRID: form | summary
             Mobile: single column
             Desktop: 2/3 + 1/3
             ══════════════════════════════════════ */}
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px] xl:gap-8">
            {/* ── LEFT COLUMN: Form sections ── */}
            <div className="flex flex-col gap-5">

              {/* ╔═══ 1. PHOTOGRAPHER SELECTION ═══╗ */}
              <BookingSection
                icon={<Camera size={15} />}
                title="Alege Fotograful"
              >
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {photographers.map((p) => {
                    const isActive = selectedPhotographer.id === p.id;
                    return (
                      <button
                        type="button"
                        key={p.id}
                        onClick={() => {
                          setSelectedPhotographer(p);
                          setSelectedDate("");
                        }}
                        className={`group flex items-center gap-3 rounded-lg border px-3 py-3
                          transition-all duration-300 cursor-pointer text-left
                          sm:flex-col sm:items-center sm:text-center sm:px-4 sm:py-5
                          ${
                            isActive
                              ? "border-gold-400/60 bg-gold-400/5"
                              : "border-stone-800 bg-stone-950/40 hover:border-stone-700 hover:bg-stone-900/60"
                          }`}
                      >
                        {/* Avatar */}
                        <img
                          src={p.avatar}
                          alt={p.name}
                          className={`h-10 w-10 shrink-0 rounded-full object-cover ring-2 transition-all duration-300
                            sm:h-14 sm:w-14
                            ${isActive ? "ring-gold-400/60" : "ring-stone-800 group-hover:ring-stone-700"}`}
                        />

                        {/* Name & specialty */}
                        <div className="min-w-0">
                          <p className="text-sm font-semibold leading-tight text-stone-100">
                            {p.name}
                          </p>
                          <p className="mt-0.5 text-xs text-stone-500">
                            {p.specialty}
                          </p>
                        </div>

                        {/* Selection pill */}
                        <span
                          className={`ml-auto shrink-0 rounded px-3 py-1 text-[10px] font-semibold tracking-wider uppercase
                            transition-all duration-300
                            sm:ml-0 sm:mt-2 sm:w-full sm:py-1.5 sm:text-center sm:text-[11px]
                            ${
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

              {/* ╔═══ 2. CALENDAR ═══╗ */}
              <BookingSection
                icon={<Calendar size={15} />}
                title="Selectează Data"
              >
                {/* Calendar constrained to a sane max but fluid within its column */}
                <div className="mx-auto w-full max-w-md lg:max-w-lg">
                  {/* Month navigation */}
                  <div className="mb-3 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={prevMonth}
                      aria-label="Luna anterioară"
                      className="cursor-pointer rounded p-1.5 text-stone-500 transition-colors hover:bg-stone-800 hover:text-stone-200"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <span className="text-sm font-semibold capitalize tracking-wide text-stone-200">
                      {monthLabel}
                    </span>
                    <button
                      type="button"
                      onClick={nextMonth}
                      aria-label="Luna următoare"
                      className="cursor-pointer rounded p-1.5 text-stone-500 transition-colors hover:bg-stone-800 hover:text-stone-200"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>

                  {/* Weekday headers */}
                  <div className="grid grid-cols-7 mb-1">
                    {["Lun", "Mar", "Mie", "Joi", "Vin", "Sâm", "Dum"].map(
                      (d) => (
                        <div
                          key={d}
                          className="py-1.5 text-center text-[11px] font-semibold uppercase tracking-wider text-stone-600"
                        >
                          {d}
                        </div>
                      )
                    )}
                  </div>

                  {/* Day cells */}
                  <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((day, idx) => {
                      if (day === null) {
                        return (
                          <div key={`e-${idx}`} className="h-10" />
                        );
                      }

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
                          className={`relative flex h-10 items-center justify-center
                            rounded text-sm transition-all duration-200
                            ${
                              selected
                                ? "bg-gold-400 font-bold text-stone-950"
                                : disabled
                                  ? "cursor-not-allowed text-stone-700 line-through opacity-40"
                                  : "cursor-pointer text-stone-400 hover:bg-stone-800 hover:text-stone-100"
                            }`}
                        >
                          {day}
                          {busy && !selected && (
                            <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-red-500" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Legend */}
                  <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 border-t border-stone-800/50 pt-3 text-[11px] text-stone-500">
                    <span className="flex items-center gap-1.5">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-500" />
                      Indisponibil
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold-400" />
                      Selectat
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-stone-700" />
                      Trecut
                    </span>
                  </div>
                </div>
              </BookingSection>

              {/* ╔═══ 3. PACKAGE + PEOPLE (side-by-side on md+) ═══╗ */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Package selection */}
                <BookingSection
                  icon={<Package size={15} />}
                  title="Alege Pachetul"
                >
                  <div className="flex flex-col gap-2.5">
                    {servicePackages.map((pkg) => {
                      const isActive = selectedPackage?.id === pkg.id;
                      return (
                        <button
                          type="button"
                          key={pkg.id}
                          onClick={() => setSelectedPackage(pkg)}
                          className={`flex w-full cursor-pointer items-center justify-between rounded-lg border
                            px-4 py-3 text-left transition-all duration-300
                            ${
                              isActive
                                ? "border-gold-400/60 bg-gold-400/5"
                                : "border-stone-800 bg-stone-950/40 hover:border-stone-700"
                            }`}
                        >
                          <div className="min-w-0 mr-3">
                            <p className="text-sm font-semibold text-stone-100">
                              {pkg.name}
                            </p>
                            <p className="mt-0.5 text-xs text-stone-500 truncate">
                              {pkg.features[0]} &middot; {pkg.features[2]}
                            </p>
                          </div>
                          <span
                            className={`shrink-0 font-serif text-lg font-bold ${
                              isActive ? "text-gold-400" : "text-stone-400"
                            }`}
                          >
                            {pkg.currency}
                            {pkg.price}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </BookingSection>

                {/* People count */}
                <BookingSection
                  icon={<Users size={15} />}
                  title="Număr de Persoane"
                >
                  <div className="flex flex-col items-center justify-center gap-3 py-3">
                    <span className="font-serif text-4xl font-bold text-stone-100">
                      {peopleCount}
                    </span>
                    <p className="text-xs text-stone-500">
                      {peopleCount === 1 ? "persoană" : "persoane"}
                    </p>
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() =>
                          setPeopleCount((c) => Math.max(1, c - 1))
                        }
                        aria-label="Scade numărul de persoane"
                        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg
                          border border-stone-700 text-lg text-stone-400
                          transition-all hover:border-gold-400/50 hover:text-gold-400"
                      >
                        −
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setPeopleCount((c) => Math.min(20, c + 1))
                        }
                        aria-label="Crește numărul de persoane"
                        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg
                          border border-stone-700 text-lg text-stone-400
                          transition-all hover:border-gold-400/50 hover:text-gold-400"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </BookingSection>
              </div>

              {/* ╔═══ 4. CONTACT INFO ═══╗ */}
              <BookingSection
                icon={<Mail size={15} />}
                title="Datele Tale de Contact"
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 flex items-center gap-2 text-xs font-medium tracking-wide text-stone-400">
                      <User size={13} />
                      Nume Complet
                    </label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="ex: Ion Popescu"
                      className="w-full rounded-lg border border-stone-800 bg-stone-950/60 px-4 py-2.5
                        text-sm text-stone-100 placeholder-stone-600 outline-none
                        transition-colors focus:border-gold-400/50"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 flex items-center gap-2 text-xs font-medium tracking-wide text-stone-400">
                      <Mail size={13} />
                      Adresă Email
                    </label>
                    <input
                      type="email"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="email@exemplu.com"
                      className="w-full rounded-lg border border-stone-800 bg-stone-950/60 px-4 py-2.5
                        text-sm text-stone-100 placeholder-stone-600 outline-none
                        transition-colors focus:border-gold-400/50"
                    />
                  </div>
                </div>
              </BookingSection>
            </div>

            {/* ── RIGHT COLUMN: Booking Summary (sticky, fixed width on desktop) ── */}
            <div>
              <div className="sticky top-28 overflow-hidden rounded-lg border border-stone-800 bg-stone-900/30">
                {/* Summary header */}
                <div className="flex items-center gap-2 border-b border-stone-800 px-4 py-3 sm:px-5">
                  <CheckCircle2 size={15} className="text-gold-400" />
                  <h3 className="text-xs font-semibold tracking-wide uppercase text-stone-200">
                    Sumar Programare
                  </h3>
                </div>

                <div className="p-4 sm:p-5">
                  {/* Summary rows */}
                  <div className="space-y-3">
                    <SummaryRow
                      label="Fotograf"
                      value={selectedPhotographer.name}
                    />
                    <SummaryRow
                      label="Data"
                      value={
                        selectedDate
                          ? new Date(
                              selectedDate + "T00:00:00"
                            ).toLocaleDateString("ro-RO", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })
                          : "Neselectată"
                      }
                      dimmed={!selectedDate}
                    />
                    <SummaryRow
                      label="Pachet"
                      value={selectedPackage?.name ?? "Neselectat"}
                      dimmed={!selectedPackage}
                    />
                    <SummaryRow
                      label="Persoane"
                      value={String(peopleCount)}
                    />
                    <SummaryRow
                      label="Contact"
                      value={clientName || "Necompletat"}
                      dimmed={!clientName}
                    />
                  </div>

                  {/* Total */}
                  <div className="mt-5 border-t border-stone-800 pt-4">
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-medium text-stone-400">
                        Total
                      </span>
                      <span className="font-serif text-2xl font-bold text-gold-400">
                        {selectedPackage
                          ? `${selectedPackage.currency}${selectedPackage.price}`
                          : "—"}
                      </span>
                    </div>
                  </div>

                  {/* Submit button */}
                  <button
                    type="button"
                    onClick={handleConfirm}
                    disabled={!canSubmit}
                    className={`mt-5 w-full cursor-pointer rounded-lg py-3.5 text-xs font-semibold
                      tracking-widest uppercase transition-all duration-300
                      ${
                        canSubmit
                          ? "bg-gold-400 text-stone-950 hover:bg-gold-500"
                          : "cursor-not-allowed bg-stone-800/60 text-stone-600"
                      }`}
                  >
                    Confirmă Programarea
                  </button>

                  {/* Validation hints */}
                  {!canSubmit && (
                    <div className="mt-3 space-y-1 text-[11px] text-stone-600">
                      {!selectedDate && <p>• Selectează o dată disponibilă</p>}
                      {!selectedPackage && <p>• Alege un pachet foto</p>}
                      {!clientName.trim() && <p>• Completează numele</p>}
                      {!clientEmail.trim() && <p>• Completează email-ul</p>}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BookingModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        photographerName={selectedPhotographer.name}
        date={selectedDate}
      />
    </>
  );
}
