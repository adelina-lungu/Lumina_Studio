export const CONFIG = {
  studioName: "Lumina Studio",
  tagline: "Servicii foto premium in Chisinau",
  contact: {
    address: "Str. Studentilor 9/11, Chisinau",
    phone: "+373 60 123 456",
    hours: "Luni — Vineri: 09:00 — 19:00",
  },
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? "",
} as const;
