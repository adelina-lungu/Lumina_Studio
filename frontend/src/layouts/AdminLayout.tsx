import { useEffect, useState } from "react";
import { Outlet, NavLink, useNavigate, Link } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Image,
  Package,
  Camera,
  HelpCircle,
  Star,
  Mail,
  MessageCircle,
  Menu,
  X,
  ArrowLeft,
} from "lucide-react";
import { useAuth, isStaff, isOwner } from "../contexts/AuthContext";
import { ROUTES } from "../constants";

const NAV_ITEMS = [
  { to: ROUTES.adminDashboard, icon: LayoutDashboard, label: "Dashboard", end: true },
  { to: ROUTES.adminBookings, icon: CalendarDays, label: "Programari" },
  { to: ROUTES.adminUsers, icon: Users, label: "Utilizatori" },
  { to: ROUTES.adminPortfolio, icon: Image, label: "Portofoliu" },
  { to: ROUTES.adminPackages, icon: Package, label: "Pachete" },
  { to: ROUTES.adminPhotographers, icon: Camera, label: "Fotografi" },
  { to: ROUTES.adminFaq, icon: HelpCircle, label: "FAQ" },
  { to: ROUTES.adminTestimonials, icon: Star, label: "Recenzii" },
  { to: ROUTES.adminContact, icon: Mail, label: "Mesaje Contact" },
  { to: ROUTES.adminSupport, icon: MessageCircle, label: "Suport Chat" },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!user || !isStaff(user)) navigate(ROUTES.forbidden);
  }, [user, navigate]);

  if (!user || !isStaff(user)) return null;

  const ownerOnly = isOwner(user);

  return (
    <div className="flex h-screen bg-stone-950 text-stone-100">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-stone-800 bg-stone-900 transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-stone-800 px-5 py-4">
          <Link to={ROUTES.home} className="group flex items-center gap-2">
            <ArrowLeft size={14} className="text-stone-500 group-hover:text-gold-400 transition-colors" />
            <span className="font-serif text-lg font-semibold tracking-[0.15em] text-stone-100 group-hover:text-gold-400 transition-colors">
              LUMINA
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden cursor-pointer text-stone-500 hover:text-stone-300"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-5 py-3 border-b border-stone-800">
          <p className="text-xs text-stone-500 uppercase tracking-wider">
            {ownerOnly ? "Owner Panel" : "Admin Panel"}
          </p>
          <p className="text-sm text-stone-300 mt-0.5 truncate">{user.name}</p>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {NAV_ITEMS.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-gold-400/10 text-gold-400 border border-gold-400/20"
                    : "text-stone-400 hover:bg-stone-800 hover:text-stone-100 border border-transparent"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex items-center gap-4 border-b border-stone-800 bg-stone-900/50 px-6 py-3 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="cursor-pointer text-stone-400 hover:text-stone-100"
          >
            <Menu size={22} />
          </button>
          <span className="font-serif text-lg font-semibold tracking-[0.15em] text-stone-100">
            LUMINA
          </span>
        </header>

        <main className="flex-1 overflow-y-auto">
          <Outlet context={{ isOwner: ownerOnly }} />
        </main>
      </div>
    </div>
  );
}
