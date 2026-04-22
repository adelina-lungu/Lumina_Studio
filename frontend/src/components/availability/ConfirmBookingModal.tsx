import { Calendar } from "lucide-react";

interface Props {
  date: string;
  photographerName: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmBookingModal({ date, photographerName, onCancel, onConfirm }: Props) {
  const dateLabel = new Date(date + "T00:00:00").toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div onClick={onCancel} className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm" />
      <div className="relative w-full max-w-sm border border-stone-800 bg-stone-900 p-8 text-center animate-fade-in-up">
        <Calendar size={32} className="mx-auto mb-4 text-gold-400" />
        <h3 className="font-serif text-xl font-semibold text-stone-100">Confirma rezervarea</h3>
        <p className="mt-3 text-sm text-stone-400">
          Vrei sa rezervi o sedinta cu <span className="font-medium text-gold-400">{photographerName}</span> pe data de{" "}
          <span className="font-medium text-stone-200">{dateLabel}</span>?
        </p>
        <div className="mt-6 flex gap-3">
          <button onClick={onCancel} className="flex-1 cursor-pointer border border-stone-700 py-2.5 text-sm font-medium text-stone-400 transition-all hover:border-stone-600 hover:text-stone-200">
            Anuleaza
          </button>
          <button onClick={onConfirm} className="flex-1 cursor-pointer bg-gold-400 py-2.5 text-sm font-semibold text-stone-950 transition-all hover:bg-gold-500">
            Rezerva
          </button>
        </div>
      </div>
    </div>
  );
}
