import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import BackToTop from "../components/layout/BackToTop";
import BookingDrawer from "../components/booking/BookingDrawer";
import AuthModal from "../components/auth/AuthModal";
import { useAuth } from "../contexts/AuthContext";
import type { ServicePackage } from "../types";

export interface LayoutContext {
  requireAuth: (cb: () => void) => void;
  openAuth: () => void;
  openBooking: () => void;
  selectPackage: (pkg: ServicePackage) => void;
}

export default function MainLayout() {
  const [preselectedPackage, setPreselectedPackage] = useState<ServicePackage | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const { user } = useAuth();

  const requireAuth = (cb: () => void) => {
    if (!user) setAuthOpen(true);
    else cb();
  };

  const openBooking = () =>
    requireAuth(() => {
      setPreselectedPackage(null);
      setBookingOpen(true);
    });

  const selectPackage = (pkg: ServicePackage) =>
    requireAuth(() => {
      setPreselectedPackage(pkg);
      setBookingOpen(true);
    });

  const openAuth = () => setAuthOpen(true);

  const ctx: LayoutContext = { requireAuth, openAuth, openBooking, selectPackage };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      <Header onOpenBooking={openBooking} onOpenAuth={openAuth} />
      <Outlet context={ctx} />
      <Footer />
      <BackToTop />

      <BookingDrawer
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        preselectedPackage={preselectedPackage}
      />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}
