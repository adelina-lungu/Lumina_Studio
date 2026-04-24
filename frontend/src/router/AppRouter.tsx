import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import HomePage from "../pages/Home/HomePage";
import PortfolioPage from "../pages/Portfolio/PortfolioPage";
import ServicesPage from "../pages/Services/ServicesPage";
import TeamPage from "../pages/Team/TeamPage";
import AboutPage from "../pages/About/AboutPage";
import FaqPage from "../pages/Faq/FaqPage";
import TestimonialsPage from "../pages/Testimonials/TestimonialsPage";
import ContactPage from "../pages/Contact/ContactPage";
import BookingPage from "../pages/Booking/BookingPage";
import PhotographerProfile from "../pages/Photographer/PhotographerPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import DashboardPage from "../pages/Admin/DashboardPage";
import AdminBookingsPage from "../pages/AdminBookings/AdminBookingsPage";
import AdminUsersPage from "../pages/Admin/UsersPage";
import AdminPortfolioPage from "../pages/Admin/PortfolioPage";
import AdminPackagesPage from "../pages/Admin/PackagesPage";
import AdminPhotographersPage from "../pages/Admin/PhotographersPage";
import AdminFaqPage from "../pages/Admin/FaqPage";
import AdminTestimonialsPage from "../pages/Admin/TestimonialsPage";
import AdminContactPage from "../pages/Admin/ContactPage";
import AdminSupport from "../pages/AdminSupport/AdminSupportPage";
import NotFoundPage from "../errors/NotFoundPage";
import ServerErrorPage from "../errors/ServerErrorPage";
import ForbiddenPage from "../errors/ForbiddenPage";
import { ROUTES } from "../constants";

export default function AppRouter() {
  return (
    <>
    <ScrollToTop />
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={ROUTES.home} element={<HomePage />} />
        <Route path={ROUTES.portfolio} element={<PortfolioPage />} />
        <Route path={ROUTES.services} element={<ServicesPage />} />
        <Route path={ROUTES.team} element={<TeamPage />} />
        <Route path={ROUTES.about} element={<AboutPage />} />
        <Route path={ROUTES.faq} element={<FaqPage />} />
        <Route path={ROUTES.testimonials} element={<TestimonialsPage />} />
        <Route path={ROUTES.contact} element={<ContactPage />} />
        <Route path={ROUTES.booking} element={<BookingPage />} />
        <Route path="/photographer/:id" element={<PhotographerProfile />} />
        <Route path={ROUTES.profile} element={<ProfilePage />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="bookings" element={<AdminBookingsPage />} />
        <Route path="users" element={<AdminUsersPage />} />
        <Route path="portfolio" element={<AdminPortfolioPage />} />
        <Route path="packages" element={<AdminPackagesPage />} />
        <Route path="photographers" element={<AdminPhotographersPage />} />
        <Route path="faq" element={<AdminFaqPage />} />
        <Route path="testimonials" element={<AdminTestimonialsPage />} />
        <Route path="contact" element={<AdminContactPage />} />
        <Route path="support" element={<AdminSupport />} />
      </Route>

      <Route path={ROUTES.forbidden} element={<ForbiddenPage />} />
      <Route path={ROUTES.serverError} element={<ServerErrorPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    </>
  );
}
