import { CalendarDays } from "lucide-react";
import { useAdminBookings } from "./useAdminBookings";
import BookingFilters from "./BookingFilters";
import BookingTable from "./BookingTable";

export default function AdminBookingsPage() {
  const admin = useAdminBookings();

  return (
    <div className="px-6 py-8 md:px-10">
      <div className="mb-8 flex items-center gap-3">
        <CalendarDays size={24} className="text-gold-400" />
        <div>
          <h1 className="font-serif text-2xl font-semibold text-stone-100">Gestionare Programari</h1>
          <p className="mt-1 text-sm text-stone-500">Vizualizeaza si gestioneaza toate programarile clientilor.</p>
        </div>
      </div>

      {admin.loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="animate-pulse rounded-lg border border-stone-800 bg-stone-900/50 px-5 py-6">
              <div className="h-4 w-1/3 rounded bg-stone-800" />
            </div>
          ))}
        </div>
      ) : (
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
            onConfirm={admin.confirmBooking}
            onComplete={admin.completeBooking}
          />
        </div>
      )}
    </div>
  );
}
