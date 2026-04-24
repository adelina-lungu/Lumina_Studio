import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LogIn } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { ROUTES } from "../../constants";
import MenuOverlay from "./MenuOverlay";
import UserDropdown from "./UserDropdown";

interface HeaderProps {
  onOpenBooking: () => void;
  onOpenAuth: () => void;
}

export default function Header({ onOpenBooking, onOpenAuth }: HeaderProps) {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${scrolled && !menuOpen ? "bg-stone-950/70 backdrop-blur-xl" : "bg-transparent"}`}>
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 md:px-10">
          <Link to={ROUTES.home} className="group relative z-[70]">
            <span className="font-serif text-2xl font-semibold tracking-[0.2em] text-stone-100 transition-colors group-hover:text-gold-400">
              LUMINA
            </span>
          </Link>

          <div className="flex items-center gap-4">
            {!menuOpen && (
              <div className="relative z-[70]">
                {user ? (
                  <UserDropdown />
                ) : (
                  <button onClick={onOpenAuth} className="flex cursor-pointer items-center gap-2 rounded-full border border-gold-400/40 bg-gold-400/10 px-4 py-2 text-xs font-medium tracking-widest uppercase text-gold-400 backdrop-blur-sm transition-all duration-300 hover:border-gold-400 hover:bg-gold-400/20">
                    <LogIn size={14} />
                    Cont
                  </button>
                )}
              </div>
            )}

            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="relative z-[70] flex h-12 w-12 cursor-pointer items-center justify-center"
              aria-label="Toggle menu"
            >
              <div className="relative h-4 w-7">
                <span
                  className={`absolute left-0 right-0 h-[1.5px] origin-center bg-stone-100 transition-all duration-300 ease-out ${
                    menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute right-0 top-1/2 h-[1.5px] -translate-y-1/2 bg-gold-400 transition-all duration-200 ease-out ${
                    menuOpen ? "w-0 opacity-0" : "w-4 opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 right-0 h-[1.5px] origin-center bg-stone-100 transition-all duration-300 ease-out ${
                    menuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      <MenuOverlay
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onBookingClick={onOpenBooking}
      />
    </>
  );
}
