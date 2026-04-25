import { CheckCircle2 } from "lucide-react";
import type { BookingFlow } from "./useBookingFlow";

type Props = Pick<
  BookingFlow,
  "selectedPhotographer" | "selectedDate" | "selectedPackage" | "peopleCount" | "clientName" | "clientEmail" | "canSubmit" | "handleConfirm" | "submitting" | "error"
>;

export default function SummaryCard(props: Props) {
  const { selectedPhotographer, selectedDate, selectedPackage, peopleCount, clientName, clientEmail, canSubmit, handleConfirm, submitting, error } = props;

  const dateLabel = selectedDate
    ? new Date(selectedDate + "T00:00:00").toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" })
    : "Neselectată";

  return (
    <div className="sticky top-28 overflow-hidden rounded-lg border border-stone-800 bg-stone-900/30">
      <div className="flex items-center gap-2 border-b border-stone-800 px-4 py-3 sm:px-5">
        <CheckCircle2 size={15} className="text-gold-400" />
        <h3 className="text-xs font-semibold tracking-wide uppercase text-stone-200">Sumar Programare</h3>
      </div>

      <div className="p-4 sm:p-5">
        <div className="space-y-3">
          <Row label="Fotograf" value={selectedPhotographer?.name ?? "Neselectat"} dimmed={!selectedPhotographer} />
          <Row label="Data" value={dateLabel} dimmed={!selectedDate} />
          <Row label="Pachet" value={selectedPackage?.name ?? "Neselectat"} dimmed={!selectedPackage} />
          <Row label="Persoane" value={String(peopleCount)} />
          <Row label="Contact" value={clientName || "Necompletat"} dimmed={!clientName} />
        </div>

        <div className="mt-5 border-t border-stone-800 pt-4">
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-medium text-stone-400">Total</span>
            <span className="font-serif text-2xl font-bold text-gold-400">
              {selectedPackage ? `${selectedPackage.currency}${selectedPackage.price}` : "—"}
            </span>
          </div>
        </div>

        {error && (
          <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-xs text-red-400">
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={handleConfirm}
          disabled={!canSubmit}
          className={`mt-5 w-full cursor-pointer rounded-lg py-3.5 text-xs font-semibold tracking-widest uppercase transition-all duration-300 ${
            canSubmit ? "bg-gold-400 text-stone-950 hover:bg-gold-500" : "cursor-not-allowed bg-stone-800/60 text-stone-600"
          }`}
        >
          {submitting ? "Se trimite..." : "Confirmă Programarea"}
        </button>

        {!canSubmit && !submitting && (
          <div className="mt-3 space-y-1 text-[11px] text-stone-600">
            {!selectedPhotographer && <p>• Selectează un fotograf</p>}
            {!selectedDate && <p>• Selectează o dată disponibilă</p>}
            {!selectedPackage && <p>• Alege un pachet foto</p>}
            {!clientName.trim() && <p>• Completează numele</p>}
            {!clientEmail.trim() && <p>• Completează email-ul</p>}
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ label, value, dimmed = false }: { label: string; value: string; dimmed?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3 text-sm">
      <span className="shrink-0 text-stone-500">{label}</span>
      <span className={`text-right truncate ${dimmed ? "italic text-stone-600" : "font-medium text-stone-200"}`}>{value}</span>
    </div>
  );
}
