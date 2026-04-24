import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  Users,
  Image,
  Star,
  Mail,
  MessageCircle,
  TrendingUp,
} from "lucide-react";
import { bookingsApi, usersApi, portfolioApi, testimonialsApi, contactApi, chatApi } from "../../api";
import { ROUTES } from "../../constants";

interface Stats {
  bookings: number;
  users: number;
  portfolio: number;
  testimonials: number;
  pendingTestimonials: number;
  contactMessages: number;
  unreadContact: number;
  conversations: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const [bookingRes, users, portfolio, testimonials, contact, conversations] = await Promise.all([
          bookingsApi.list({}),
          usersApi.list(),
          portfolioApi.list(),
          testimonialsApi.listAll(),
          contactApi.list(),
          chatApi.listConversations(),
        ]);
        setStats({
          bookings: bookingRes.totalCount,
          users: users.length,
          portfolio: portfolio.length,
          testimonials: testimonials.filter((t) => t.isApproved).length,
          pendingTestimonials: testimonials.filter((t) => !t.isApproved).length,
          contactMessages: contact.length,
          unreadContact: contact.filter((c) => !c.isRead).length,
          conversations: conversations.length,
        });
      } catch {
        // handled by toast
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const cards = stats
    ? [
        { label: "Programari", value: stats.bookings, icon: CalendarDays, color: "text-blue-400", bg: "bg-blue-400/10", route: ROUTES.adminBookings },
        { label: "Utilizatori", value: stats.users, icon: Users, color: "text-emerald-400", bg: "bg-emerald-400/10", route: ROUTES.adminUsers },
        { label: "Imagini Portofoliu", value: stats.portfolio, icon: Image, color: "text-purple-400", bg: "bg-purple-400/10", route: ROUTES.adminPortfolio },
        { label: "Recenzii Aprobate", value: stats.testimonials, icon: Star, color: "text-gold-400", bg: "bg-gold-400/10", route: ROUTES.adminTestimonials },
        { label: "Recenzii in Asteptare", value: stats.pendingTestimonials, icon: Star, color: "text-amber-400", bg: "bg-amber-400/10", route: ROUTES.adminTestimonials },
        { label: "Mesaje Necitite", value: stats.unreadContact, icon: Mail, color: "text-red-400", bg: "bg-red-400/10", route: ROUTES.adminContact },
        { label: "Conversatii Chat", value: stats.conversations, icon: MessageCircle, color: "text-cyan-400", bg: "bg-cyan-400/10", route: ROUTES.adminSupport },
      ]
    : [];

  return (
    <div className="px-6 py-8 md:px-10">
      <div className="mb-8 flex items-center gap-3">
        <TrendingUp size={24} className="text-gold-400" />
        <div>
          <h1 className="font-serif text-2xl font-semibold text-stone-100">Dashboard</h1>
          <p className="mt-1 text-sm text-stone-500">Privire de ansamblu asupra studioului.</p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="animate-pulse rounded-lg border border-stone-800 bg-stone-900/50 px-5 py-6">
              <div className="h-4 w-1/2 rounded bg-stone-800" />
              <div className="mt-3 h-8 w-1/3 rounded bg-stone-800" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cards.map((card) => (
            <button
              key={card.label}
              onClick={() => navigate(card.route)}
              className="group cursor-pointer rounded-lg border border-stone-800 bg-stone-900/50 px-5 py-5 text-left transition-all hover:border-stone-700 hover:bg-stone-900"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-stone-500">{card.label}</p>
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${card.bg}`}>
                  <card.icon size={18} className={card.color} />
                </div>
              </div>
              <p className={`mt-2 text-3xl font-bold ${card.color}`}>{card.value}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
