import { useState } from "react";
import { X, Mail, Lock, User, Phone } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

interface FieldErrors {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
}

const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
const isValidPhone = (p: string) => /^\+?[0-9]{7,15}$/.test(p.replace(/\s/g, ""));

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const { login, register } = useAuth();

  if (!open) return null;

  const markTouched = (field: string) =>
    setTouched((prev) => new Set(prev).add(field));

  const validate = (): FieldErrors => {
    const errs: FieldErrors = {};

    if (!email.trim()) errs.email = "Emailul este obligatoriu.";
    else if (!isValidEmail(email)) errs.email = "Adresa de email nu este valida.";

    if (!password.trim()) errs.password = "Parola este obligatorie.";
    else if (!isLogin && password.length < 6) errs.password = "Minim 6 caractere.";

    if (!isLogin) {
      if (!name.trim()) errs.name = "Numele este obligatoriu.";
      else if (name.trim().length < 2) errs.name = "Minim 2 caractere.";

      if (!phone.trim()) errs.phone = "Telefonul este obligatoriu.";
      else if (!isValidPhone(phone)) errs.phone = "Format invalid (ex: +373 60123456).";
    }

    return errs;
  };

  const fieldError = (field: keyof FieldErrors) =>
    touched.has(field) ? validate()[field] : undefined;

  const handleSubmit = async () => {
    setServerError("");
    const errs = validate();
    setTouched(new Set(["name", "email", "phone", "password"]));

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});

    if (isLogin) {
      const err = await login(email, password);
      if (err) setServerError(err);
      else resetAndClose();
    } else {
      const err = await register(name, email, phone, password);
      if (err) setServerError(err);
      else resetAndClose();
    }
  };

  const resetAndClose = () => {
    setName(""); setEmail(""); setPhone(""); setPassword("");
    setErrors({}); setServerError(""); setTouched(new Set());
    onClose();
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setErrors({}); setServerError(""); setTouched(new Set());
  };

  const inputClass = (field: keyof FieldErrors) =>
    `w-full rounded-lg border bg-stone-950/60 px-4 py-2.5 text-sm text-stone-100 placeholder-stone-600 outline-none transition-colors ${
      fieldError(field) ? "border-red-500/60 focus:border-red-500" : "border-stone-800 focus:border-gold-400/50"
    }`;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div onClick={resetAndClose} className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm" />
      <div className="relative w-full max-w-md border border-stone-800 bg-stone-900 p-8 animate-fade-in-up sm:p-10">
        <button onClick={resetAndClose} aria-label="Inchide" className="absolute right-4 top-4 cursor-pointer text-stone-500 transition-colors hover:text-stone-300">
          <X size={20} />
        </button>

        <h2 className="font-serif text-2xl font-semibold text-stone-100">
          {isLogin ? "Autentificare" : "Inregistrare"}
        </h2>
        <p className="mt-2 text-sm text-stone-400">
          {isLogin ? "Intra in contul tau LUMINA." : "Creaza un cont nou."}
        </p>

        {serverError && (
          <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
            {serverError}
          </div>
        )}

        <div className="mt-6 flex flex-col gap-4">
          {!isLogin && (
            <div>
              <label className="mb-1.5 flex items-center gap-2 text-xs font-medium tracking-wide text-stone-400">
                <User size={13} /> Nume Complet <span className="text-red-400">*</span>
              </label>
              <input
                type="text" value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => markTouched("name")}
                placeholder="ex: Adelina Lungu"
                className={inputClass("name")}
              />
              {fieldError("name") && <p className="mt-1 text-xs text-red-400">{fieldError("name")}</p>}
            </div>
          )}

          <div>
            <label className="mb-1.5 flex items-center gap-2 text-xs font-medium tracking-wide text-stone-400">
              <Mail size={13} /> Email <span className="text-red-400">*</span>
            </label>
            <input
              type="email" value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => markTouched("email")}
              placeholder="email@exemplu.com"
              className={inputClass("email")}
            />
            {fieldError("email") && <p className="mt-1 text-xs text-red-400">{fieldError("email")}</p>}
          </div>

          {!isLogin && (
            <div>
              <label className="mb-1.5 flex items-center gap-2 text-xs font-medium tracking-wide text-stone-400">
                <Phone size={13} /> Telefon <span className="text-red-400">*</span>
              </label>
              <input
                type="tel" value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onBlur={() => markTouched("phone")}
                placeholder="+373 60 123 456"
                className={inputClass("phone")}
              />
              {fieldError("phone") && <p className="mt-1 text-xs text-red-400">{fieldError("phone")}</p>}
            </div>
          )}

          <div>
            <label className="mb-1.5 flex items-center gap-2 text-xs font-medium tracking-wide text-stone-400">
              <Lock size={13} /> Parola <span className="text-red-400">*</span>
            </label>
            <input
              type="password" value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => markTouched("password")}
              placeholder="••••••••"
              className={inputClass("password")}
            />
            {fieldError("password")
              ? <p className="mt-1 text-xs text-red-400">{fieldError("password")}</p>
              : !isLogin && <p className="mt-1 text-xs text-stone-600">Minim 6 caractere</p>
            }
          </div>

          <button onClick={handleSubmit} className="mt-2 w-full cursor-pointer rounded-lg bg-gold-400 py-3.5 text-xs font-semibold tracking-widest uppercase text-stone-950 transition-all duration-300 hover:bg-gold-500">
            {isLogin ? "Intra in cont" : "Creaza contul"}
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-stone-500">
          {isLogin ? "Nu ai cont? " : "Ai deja cont? "}
          <button onClick={switchMode} className="cursor-pointer text-gold-400 underline underline-offset-4 transition-colors hover:text-gold-500">
            {isLogin ? "Inregistreaza-te" : "Autentifica-te"}
          </button>
        </p>
      </div>
    </div>
  );
}
