import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import MainLayout from "../layouts/MainLayout";
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
      </Route>

      <Route path={ROUTES.adminSupport} element={<AdminSupport />} />
      <Route path={ROUTES.forbidden} element={<ForbiddenPage />} />
      <Route path={ROUTES.serverError} element={<ServerErrorPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    </>
  );
}
