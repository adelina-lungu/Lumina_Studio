import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { ROUTES } from "../../constants";
import { useAdminBookings } from "./useAdminBookings";
import BookingFilters from "./BookingFilters";
import BookingTable from "./BookingTable";

export default function AdminBookingsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const admin = useAdminBookings();

  useEffect(() => {
    if (!user || user.role !== "admin") navigate(ROUTES.forbidden);
  }, [user, navigate]);

  if (!user || user.role !== "admin") return null;

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      <div className="mx-auto w-full max-w-5xl px-6 pt-10 pb-16 md:px-10">
        <div className="mb-8 flex items-center gap-4">
          <Link
            to={ROUTES.home}
            className="flex items-center gap-2 text-sm text-stone-500 transition-colors hover:text-stone-300"
          >
            <ArrowLeft size={16} />
            Acasa
          </Link>
        </div>

        <div className="mb-8 flex items-center gap-3">
          <CalendarDays size={24} className="text-gold-400" />
          <div>
            <h1 className="font-serif text-2xl font-semibold text-stone-100">Gestionare programari</h1>
            <p className="mt-1 text-sm text-stone-500">Vizualizeaza si gestioneaza toate programarile clientilor.</p>
          </div>
        </div>

        <div className="space-y-6">
          <BookingFilters
            photographers={admin.photographers}
            filterPhotographer={admin.filterPhotographer}
            setFilterPhotographer={admin.setFilterPhotographer}
            sortField={admin.sortField}
            sortAsc={admin.sortAsc}
            toggleSort={admin.toggleSort}
            totalCount={admin.totalCount}
            shownCount={admin.bookings.length}
          />

          <BookingTable
            bookings={admin.bookings}
            onCancel={admin.cancelBooking}
          />
        </div>
      </div>
    </div>
  );
}
