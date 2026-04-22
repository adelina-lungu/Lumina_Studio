import { useState } from "react";
import { Camera, Mail, Phone, Shield } from "lucide-react";
import type { User } from "../../contexts/AuthContext";

interface Props {
  user: User;
  editName: string;
  setEditName: (v: string) => void;
  editPhone: string;
  setEditPhone: (v: string) => void;
  hasChanges: boolean;
  onSave: () => void;
}

const isValidPhone = (p: string) => !p.trim() || /^\+?[0-9]{7,15}$/.test(p.replace(/\s/g, ""));

export default function ProfileInfo({ user, editName, setEditName, editPhone, setEditPhone, hasChanges, onSave }: Props) {
  const initials = user.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
  const [touchedName, setTouchedName] = useState(false);
  const [touchedPhone, setTouchedPhone] = useState(false);

  const nameError = touchedName && !editName.trim() ? "Numele este obligatoriu." : undefined;
  const phoneError = touchedPhone && !isValidPhone(editPhone) ? "Format invalid (ex: +373 60123456)." : undefined;
  const canSave = hasChanges && !nameError && !phoneError && editName.trim().length > 0;

  const inputClass = (hasError: boolean) =>
    `w-full rounded-lg border bg-stone-900 px-4 py-2.5 text-sm text-stone-100 outline-none transition-colors ${
      hasError ? "border-red-500/60 focus:border-red-500" : "border-stone-800 focus:border-gold-400/50"
    }`;

  return (
    <section className="mx-auto w-full max-w-2xl px-6 pt-32 pb-12">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-8">
        <div className="relative">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gold-400 text-2xl font-bold text-stone-950 shadow-lg shadow-gold-400/20">
            {initials}
          </div>
          <div className="absolute -bottom-1 -right-1 rounded-full bg-stone-800 p-1.5 ring-2 ring-stone-950">
            <Camera size={12} className="text-stone-400" />
          </div>
        </div>

        <div className="flex-1 text-center sm:text-left">
          <div className="flex items-center justify-center gap-2 sm:justify-start">
            <h1 className="font-serif text-2xl font-semibold text-stone-100">{user.name}</h1>
            {user.role === "admin" && (
              <span className="inline-flex items-center gap-1 rounded bg-gold-400/10 border border-gold-400/30 px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase text-gold-400">
                <Shield size={10} />
                Admin
              </span>
            )}
          </div>
          <div className="mt-2 flex flex-col gap-1">
            <p className="flex items-center justify-center gap-2 text-sm text-stone-500 sm:justify-start">
              <Mail size={13} /> {user.email}
            </p>
            {user.phone && (
              <p className="flex items-center justify-center gap-2 text-sm text-stone-500 sm:justify-start">
                <Phone size={13} /> {user.phone}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-10 space-y-5">
        <h2 className="text-sm font-medium tracking-[0.2em] uppercase text-stone-500">Editare profil</h2>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-stone-400">Nume <span className="text-red-400">*</span></label>
          <input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onBlur={() => setTouchedName(true)}
            className={inputClass(!!nameError)}
          />
          {nameError && <p className="mt-1 text-xs text-red-400">{nameError}</p>}
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-stone-400">Telefon</label>
          <input
            value={editPhone}
            onChange={(e) => setEditPhone(e.target.value)}
            onBlur={() => setTouchedPhone(true)}
            className={inputClass(!!phoneError)}
          />
          {phoneError && <p className="mt-1 text-xs text-red-400">{phoneError}</p>}
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-stone-400">Email</label>
          <input
            value={user.email}
            disabled
            className="w-full rounded-lg border border-stone-800 bg-stone-900/50 px-4 py-2.5 text-sm text-stone-500 cursor-not-allowed"
          />
          <p className="mt-1 text-[11px] text-stone-600">Emailul nu poate fi modificat</p>
        </div>

        {hasChanges && (
          <button
            onClick={canSave ? onSave : undefined}
            disabled={!canSave}
            className={`mt-2 w-full rounded-lg px-6 py-2.5 text-sm font-semibold transition-colors ${
              canSave
                ? "cursor-pointer bg-gold-400 text-stone-950 hover:bg-gold-300"
                : "cursor-not-allowed bg-stone-800/60 text-stone-600"
            }`}
          >
            Salveaza modificarile
          </button>
        )}
      </div>
    </section>
  );
}
