import { useState } from "react";
import { Mail, User } from "lucide-react";
import BookingSection from "./BookingSection";

interface Props {
  clientName: string;
  setClientName: (v: string) => void;
  clientEmail: string;
  setClientEmail: (v: string) => void;
}

const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

export default function DetailsStep({ clientName, setClientName, clientEmail, setClientEmail }: Props) {
  const [touchedName, setTouchedName] = useState(false);
  const [touchedEmail, setTouchedEmail] = useState(false);

  const nameError = touchedName && !clientName.trim() ? "Numele este obligatoriu." : undefined;
  const emailError = touchedEmail
    ? !clientEmail.trim()
      ? "Emailul este obligatoriu."
      : !isValidEmail(clientEmail)
        ? "Adresa de email nu este valida."
        : undefined
    : undefined;

  const inputClass = (hasError: boolean) =>
    `w-full rounded-lg border bg-stone-950/60 px-4 py-2.5 text-sm text-stone-100 placeholder-stone-600 outline-none transition-colors ${
      hasError ? "border-red-500/60 focus:border-red-500" : "border-stone-800 focus:border-gold-400/50"
    }`;

  return (
    <BookingSection icon={<Mail size={15} />} title="Datele Tale de Contact">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 flex items-center gap-2 text-xs font-medium tracking-wide text-stone-400">
            <User size={13} />
            Nume Complet <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            onBlur={() => setTouchedName(true)}
            placeholder="ex: Ion Popescu"
            className={inputClass(!!nameError)}
          />
          {nameError && <p className="mt-1 text-xs text-red-400">{nameError}</p>}
        </div>
        <div>
          <label className="mb-1.5 flex items-center gap-2 text-xs font-medium tracking-wide text-stone-400">
            <Mail size={13} />
            Adresa Email <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            onBlur={() => setTouchedEmail(true)}
            placeholder="email@exemplu.com"
            className={inputClass(!!emailError)}
          />
          {emailError && <p className="mt-1 text-xs text-red-400">{emailError}</p>}
        </div>
      </div>
    </BookingSection>
  );
}
