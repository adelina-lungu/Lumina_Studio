import { useState, useEffect, useRef } from "react";
import { LogIn, LogOut, User, ChevronDown, MessageCircle, ArrowRight, MapPin, Phone, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import AuthModal from "./AuthModal";

interface HeaderProps {
  onOpenBooking: () => void;
}

const menuLinks = [
  { label: "Portofoliu", href: "#portfolio", number: "01" },
  { label: "Servicii", href: "#services", number: "02" },
  { label: "Echipa", href: "#team", number: "03" },
  { label: "Despre Noi", href: "#about", number: "04" },
  { label: "FAQ", href: "#faq", number: "05" },
  { label: "Recenzii", href: "#testimonials", number: "06" },
  { label: "Contact", href: "#contact", number: "07" },
];

export default function Header({ onOpenBooking }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 400);
  };

  const handleBookingClick = () => {
    setMenuOpen(false);
    setTimeout(() => {
      if (!user) {
        setAuthOpen(true);
      } else {
        onOpenBooking();
      }
    }, 400);
  };

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
  };

  const getInitials = (name: string) =>
    name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${scrolled && !menuOpen ? "bg-stone-950/70 backdrop-blur-xl" : "bg-transparent"}`}>
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 md:px-10">
          <a href="/" className="group relative z-[70]">
            <span className={`font-serif text-2xl font-semibold tracking-[0.2em] transition-colors ${menuOpen ? "text-stone-100" : "text-stone-100 group-hover:text-gold-400"}`}>
              LUMINA
            </span>
          </a>

          <div className="flex items-center gap-4">
            {!menuOpen && (
              <div className="relative z-[70]">
                {user ? (
                  <div ref={dropdownRef} className="relative">
                    <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex cursor-pointer items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-400 text-xs font-bold text-stone-950 shadow-lg shadow-gold-400/20">
                        {getInitials(user.name)}
                      </div>
                      <ChevronDown size={14} className={`text-stone-400 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`} />
                    </button>

                    {dropdownOpen && (
                      <div className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-lg border border-stone-800 bg-stone-900 shadow-xl animate-fade-in-up">
                        <div className="border-b border-stone-800 px-4 py-3">
                          <p className="text-sm font-medium text-stone-100">{user.name}</p>
                          <p className="text-xs text-stone-500">{user.email}</p>
                          {user.role === "admin" && (
                            <span className="mt-1 inline-block rounded bg-gold-400/10 border border-gold-400/30 px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase text-gold-400">Admin</span>
                          )}
                        </div>
                        <div className="p-1.5">
                          <button onClick={() => setDropdownOpen(false)} className="flex w-full cursor-pointer items-center gap-2.5 rounded-md px-3 py-2 text-sm text-stone-400 transition-colors hover:bg-stone-800 hover:text-stone-100">
                            <User size={15} />
                            Profilul meu
                          </button>
                          {user.role === "admin" && (
                            <button onClick={() => { setDropdownOpen(false); navigate("/admin/support"); }} className="flex w-full cursor-pointer items-center gap-2.5 rounded-md px-3 py-2 text-sm text-stone-400 transition-colors hover:bg-stone-800 hover:text-stone-100">
                              <MessageCircle size={15} />
                              Suport Chat
                            </button>
                          )}
                          <button onClick={handleLogout} className="flex w-full cursor-pointer items-center gap-2.5 rounded-md px-3 py-2 text-sm text-stone-400 transition-colors hover:bg-red-500/10 hover:text-red-400">
                            <LogOut size={15} />
                            Iesire din cont
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <button onClick={() => setAuthOpen(true)} className="flex cursor-pointer items-center gap-2 rounded-full border border-gold-400/40 bg-gold-400/10 px-4 py-2 text-xs font-medium tracking-widest uppercase text-gold-400 backdrop-blur-sm transition-all duration-300 hover:border-gold-400 hover:bg-gold-400/20">
                    <LogIn size={14} />
                    Cont
                  </button>
                )}
              </div>
            )}

            <button
              onClick={() => { setMenuOpen(!menuOpen); setDropdownOpen(false); }}
              className="relative z-[70] flex h-12 w-12 cursor-pointer items-center justify-center"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col items-end gap-1.5">
                <span className={`block h-[2px] bg-stone-100 transition-all duration-500 ${menuOpen ? "w-7 translate-y-[5px] rotate-45" : "w-7"}`} />
                <span className={`block h-[2px] bg-gold-400 transition-all duration-300 ${menuOpen ? "w-0 opacity-0" : "w-5"}`} />
                <span className={`block h-[2px] bg-stone-100 transition-all duration-500 ${menuOpen ? "w-7 -translate-y-[5px] -rotate-45" : "w-7"}`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* FULLSCREEN OVERLAY */}
      <div className={`fixed inset-0 z-[55] transition-all duration-700 ${menuOpen ? "visible" : "invisible"}`}>
        <div className={`absolute inset-0 bg-stone-950/60 backdrop-blur-md transition-opacity duration-700 ${menuOpen ? "opacity-100" : "opacity-0"}`} />
        <div className="relative z-10 flex h-full flex-col justify-center px-6 md:px-10">
          <div className="mx-auto w-full max-w-6xl">
            <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1fr_380px] lg:gap-16">

              {/* Left — nav links */}
              <nav className="flex flex-col">
                {menuLinks.map((link, i) => (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={`group flex cursor-pointer items-center gap-4 border-b border-gold-400/15 py-4 text-left transition-all sm:gap-6 sm:py-5 ${menuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
                    style={{ transitionDelay: menuOpen ? `${150 + i * 80}ms` : "0ms", transitionDuration: "600ms" }}
                  >
                    <span className="text-xs font-medium tracking-wider text-gold-400/40 transition-colors group-hover:text-gold-400 sm:text-sm">
                      {link.number}
                    </span>
                    <span className="font-serif text-3xl font-semibold text-stone-300 transition-all duration-300 group-hover:text-stone-50 group-hover:translate-x-2 sm:text-4xl lg:text-5xl">
                      {link.label}
                    </span>
                    <ArrowRight size={20} className="ml-auto text-stone-700 transition-all duration-300 group-hover:text-gold-400 group-hover:translate-x-1 opacity-0 group-hover:opacity-100" />
                  </button>
                ))}

                {/* Programare — special */}
                <button
                  onClick={handleBookingClick}
                  className={`group flex cursor-pointer items-center gap-4 border-t border-gold-400/15 py-5 mt-1 text-left transition-all sm:gap-6 ${menuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
                  style={{ transitionDelay: menuOpen ? `${150 + menuLinks.length * 80}ms` : "0ms", transitionDuration: "600ms" }}
                >
                  <span className="text-xs font-medium tracking-wider text-gold-400 sm:text-sm">
                    08
                  </span>
                  <span className="font-serif text-3xl font-semibold text-gold-400 transition-all duration-300 group-hover:translate-x-2 sm:text-4xl lg:text-5xl">
                    Programare
                  </span>
                  <ArrowRight size={20} className="ml-auto text-gold-400/50 transition-all duration-300 group-hover:text-gold-400 group-hover:translate-x-1 opacity-0 group-hover:opacity-100" />
                </button>
              </nav>

              {/* Right — info panel */}
              <div className={`hidden lg:flex flex-col justify-center transition-all duration-700 ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: menuOpen ? "500ms" : "0ms" }}>
                <div className="rounded-lg border border-gold-400/15 bg-stone-900/40 p-8">
                  {/* Studio info */}
                  <p className="text-xs font-medium tracking-[0.3em] uppercase text-gold-400 mb-3">Studio Foto</p>
                  <p className="text-sm leading-relaxed text-stone-400">
                    Servicii foto premium in Chisinau. Transformam fiecare moment in arta vizuala de exceptie.
                  </p>

                  {/* Divider */}
                  <div className="my-6 h-px bg-gradient-to-r from-gold-400/20 via-gold-400/10 to-transparent" />

                  {/* Contact */}
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start gap-3">
                      <MapPin size={15} className="mt-0.5 shrink-0 text-gold-400/60" />
                      <div>
                        <p className="text-[10px] font-medium tracking-wide uppercase text-stone-600">Adresa</p>
                        <p className="text-sm text-stone-300 mt-0.5">Str. Studentilor 9/11, Chisinau</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone size={15} className="mt-0.5 shrink-0 text-gold-400/60" />
                      <div>
                        <p className="text-[10px] font-medium tracking-wide uppercase text-stone-600">Telefon</p>
                        <p className="text-sm text-stone-300 mt-0.5">+373 60 123 456</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock size={15} className="mt-0.5 shrink-0 text-gold-400/60" />
                      <div>
                        <p className="text-[10px] font-medium tracking-wide uppercase text-stone-600">Program</p>
                        <p className="text-sm text-stone-300 mt-0.5">Luni — Vineri: 09:00 — 19:00</p>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="my-6 h-px bg-gradient-to-r from-gold-400/20 via-gold-400/10 to-transparent" />

                  {/* Copyright */}
                  <p className="text-[11px] text-stone-600">&copy; 2026 Lumina Studio</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}