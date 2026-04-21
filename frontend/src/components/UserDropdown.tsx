import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, LogOut, MessageCircle, User } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { ROUTES } from "../constants";

const getInitials = (name: string) =>
  name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

export default function UserDropdown() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  if (!user) return null;

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(!open)} className="flex cursor-pointer items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-400 text-xs font-bold text-stone-950 shadow-lg shadow-gold-400/20">
          {getInitials(user.name)}
        </div>
        <ChevronDown size={14} className={`text-stone-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-lg border border-stone-800 bg-stone-900 shadow-xl animate-fade-in-up">
          <div className="border-b border-stone-800 px-4 py-3">
            <p className="text-sm font-medium text-stone-100">{user.name}</p>
            <p className="text-xs text-stone-500">{user.email}</p>
            {user.role === "admin" && (
              <span className="mt-1 inline-block rounded bg-gold-400/10 border border-gold-400/30 px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase text-gold-400">Admin</span>
            )}
          </div>
          <div className="p-1.5">
            <button onClick={() => setOpen(false)} className="flex w-full cursor-pointer items-center gap-2.5 rounded-md px-3 py-2 text-sm text-stone-400 transition-colors hover:bg-stone-800 hover:text-stone-100">
              <User size={15} />
              Profilul meu
            </button>
            {user.role === "admin" && (
              <button onClick={() => { setOpen(false); navigate(ROUTES.adminSupport); }} className="flex w-full cursor-pointer items-center gap-2.5 rounded-md px-3 py-2 text-sm text-stone-400 transition-colors hover:bg-stone-800 hover:text-stone-100">
                <MessageCircle size={15} />
                Suport Chat
              </button>
            )}
            <button onClick={() => { logout(); setOpen(false); }} className="flex w-full cursor-pointer items-center gap-2.5 rounded-md px-3 py-2 text-sm text-stone-400 transition-colors hover:bg-red-500/10 hover:text-red-400">
              <LogOut size={15} />
              Iesire din cont
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
