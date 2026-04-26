import { useOutletContext } from "react-router-dom";
import Hero from "../../components/ui/Hero";
import CtaBanner from "../../components/ui/CtaBanner";
import PortfolioTeaser from "./sections/PortfolioTeaser";
import ServicesTeaser from "./sections/ServicesTeaser";
import TeamTeaser from "./sections/TeamTeaser";
import TestimonialStrip from "./sections/TestimonialStrip";
import FaqTeaser from "./sections/FaqTeaser";
import ContactTeaser from "./sections/ContactTeaser";
import type { LayoutContext } from "../../layouts/MainLayout";

export default function HomePage() {
  const { openBooking } = useOutletContext<LayoutContext>();

  return (
    <main>
      <Hero />
      <PortfolioTeaser />
      <ServicesTeaser />
      <TeamTeaser />
      <TestimonialStrip />
      <CtaBanner onOpenBooking={openBooking} />
      <FaqTeaser />
      <ContactTeaser />
    </main>
  );
}
