import { useOutletContext } from "react-router-dom";
import Hero from "../components/Hero";
import Portfolio from "../components/Portfolio";
import Services from "../components/Services";
import Process from "../components/Process";
import Testimonials from "../components/Testimonials";
import AboutUs from "../components/AboutUs";
import Team from "../components/Team";
import Faq from "../components/Faq";
import CtaBanner from "../components/CtaBanner";
import Contact from "../components/Contact";
import type { LayoutContext } from "../layouts/MainLayout";

export default function HomePage() {
  const { openBooking, selectPackage } = useOutletContext<LayoutContext>();

  return (
    <>
      <main>
        <Hero />
        <Portfolio />
        <Services onSelectPackage={selectPackage} />
        <Process />
        <Testimonials />
        <Team />
        <AboutUs />
        <Faq />
        <CtaBanner onOpenBooking={openBooking} />
      </main>
      <Contact />
    </>
  );
}
