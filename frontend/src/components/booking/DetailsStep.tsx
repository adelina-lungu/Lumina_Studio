import { Mail, User } from "lucide-react";
import BookingSection from "./BookingSection";

interface Props {
  clientName: string;
  setClientName: (v: string) => void;
  clientEmail: string;
  setClientEmail: (v: string) => void;
}

export default function DetailsStep({ clientName, setClientName, clientEmail, setClientEmail }: Props) {
  return (
    <BookingSection icon={<Mail size={15} />} title="Datele Tale de Contact">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field icon={<User size={13} />} label="Nume Complet">
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="ex: Ion Popescu"
            className="w-full rounded-lg border border-stone-800 bg-stone-950/60 px-4 py-2.5 text-sm text-stone-100 placeholder-stone-600 outline-none transition-colors focus:border-gold-400/50"
          />
        </Field>
        <Field icon={<Mail size={13} />} label="Adresă Email">
          <input
            type="email"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            placeholder="email@exemplu.com"
            className="w-full rounded-lg border border-stone-800 bg-stone-950/60 px-4 py-2.5 text-sm text-stone-100 placeholder-stone-600 outline-none transition-colors focus:border-gold-400/50"
          />
        </Field>
      </div>
    </BookingSection>
  );
}

function Field({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 flex items-center gap-2 text-xs font-medium tracking-wide text-stone-400">
        {icon}
        {label}
      </label>
      {children}
    </div>
  );
}
