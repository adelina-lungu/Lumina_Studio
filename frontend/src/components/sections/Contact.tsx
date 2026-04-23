import { useState } from "react";
import { MapPin, Phone, Clock, Send, User, Mail, MessageSquare } from "lucide-react";

const contactInfo = [
  {
    icon: <MapPin size={18} />,
    label: "Adresa",
    value: "Str. Studentilor 9/11, Chisinau (UTM, Rascani)",
  },
  {
    icon: <Phone size={18} />,
    label: "Telefon",
    value: "+373 60 123 456",
  },
  {
    icon: <Clock size={18} />,
    label: "Program",
    value: "Lun — Vin: 09:00 — 19:00",
  },
];

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [sent, setSent] = useState(false);

  const markTouched = (field: string) =>
    setTouched((prev) => new Set(prev).add(field));

  const validate = (): FieldErrors => {
    const errs: FieldErrors = {};
    if (!name.trim()) errs.name = "Numele este obligatoriu.";
    if (!email.trim()) errs.email = "Emailul este obligatoriu.";
    else if (!isValidEmail(email)) errs.email = "Adresa de email nu este valida.";
    if (!message.trim()) errs.message = "Mesajul este obligatoriu.";
    else if (message.trim().length < 10) errs.message = "Minim 10 caractere.";
    return errs;
  };

  const fieldError = (field: keyof FieldErrors) =>
    touched.has(field) ? validate()[field] : undefined;

  const handleSubmit = () => {
    const errs = validate();
    setTouched(new Set(["name", "email", "message"]));
    if (Object.keys(errs).length > 0) return;
    setSent(true);
    setName(""); setEmail(""); setMessage(""); setTouched(new Set());
  };

  const inputClass = (field: keyof FieldErrors) =>
    `w-full rounded-lg border bg-stone-950/60 px-4 py-2.5 text-sm text-stone-100 placeholder-stone-600 outline-none transition-colors ${
      fieldError(field) ? "border-red-500/60 focus:border-red-500" : "border-stone-800 focus:border-gold-400/50"
    }`;

  return (
    <section id="contact" className="px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-12 text-center md:mb-16">
          <p className="mb-3 text-sm font-medium tracking-[0.3em] uppercase text-gold-400">
            Contacteaza-ne
          </p>
          <h2 className="font-serif text-3xl font-semibold text-stone-100 sm:text-4xl md:text-5xl">
            Unde Ne Gasesti
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-12">
          {contactInfo.map((item) => (
            <div key={item.label} className="rounded-lg border border-stone-800 bg-stone-900/30 px-5 py-6 text-center transition-all duration-300 hover:border-stone-700">
              <span className="mx-auto mb-3 flex justify-center text-gold-400">{item.icon}</span>
              <p className="text-xs font-medium tracking-wide uppercase text-stone-500">{item.label}</p>
              <p className="mt-1.5 text-sm font-medium text-stone-200">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <h3 className="mb-6 text-sm font-medium tracking-[0.2em] uppercase text-stone-500">Trimite-ne un mesaj</h3>

            {sent && (
              <div className="mb-5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
                Mesajul a fost trimis cu succes! Te vom contacta in curand.
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="mb-1.5 flex items-center gap-2 text-xs font-medium tracking-wide text-stone-400">
                  <User size={13} /> Nume <span className="text-red-400">*</span>
                </label>
                <input
                  type="text" value={name}
                  onChange={(e) => { setName(e.target.value); setSent(false); }}
                  onBlur={() => markTouched("name")}
                  placeholder="ex: Adelina Lungu"
                  className={inputClass("name")}
                />
                {fieldError("name") && <p className="mt-1 text-xs text-red-400">{fieldError("name")}</p>}
              </div>

              <div>
                <label className="mb-1.5 flex items-center gap-2 text-xs font-medium tracking-wide text-stone-400">
                  <Mail size={13} /> Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email" value={email}
                  onChange={(e) => { setEmail(e.target.value); setSent(false); }}
                  onBlur={() => markTouched("email")}
                  placeholder="email@exemplu.com"
                  className={inputClass("email")}
                />
                {fieldError("email") && <p className="mt-1 text-xs text-red-400">{fieldError("email")}</p>}
              </div>

              <div>
                <label className="mb-1.5 flex items-center gap-2 text-xs font-medium tracking-wide text-stone-400">
                  <MessageSquare size={13} /> Mesaj <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => { setMessage(e.target.value); setSent(false); }}
                  onBlur={() => markTouched("message")}
                  placeholder="Spune-ne cum te putem ajuta..."
                  rows={5}
                  className={`${inputClass("message")} resize-none`}
                />
                {fieldError("message") && <p className="mt-1 text-xs text-red-400">{fieldError("message")}</p>}
              </div>

              <button
                onClick={handleSubmit}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-gold-400 py-3.5 text-xs font-semibold tracking-widest uppercase text-stone-950 transition-all duration-300 hover:bg-gold-500"
              >
                <Send size={14} />
                Trimite mesajul
              </button>
            </div>
          </div>

          <div className="rounded-lg border border-stone-800 overflow-hidden" style={{ minHeight: "400px" }}>
            <iframe
              title="Locatia LUMINA Studio"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2720.5!2d28.8075!3d47.0365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97c456a8c8b0d%3A0x7b3f3b1e3b3b3b3b!2sUniversitatea%20Tehnic%C4%83%20a%20Moldovei!5e0!3m2!1sro!2smd!4v1700000000000!5m2!1sro!2smd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
