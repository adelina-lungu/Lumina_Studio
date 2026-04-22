import { Link } from "react-router-dom";
import { ArrowRight, Camera, Heart, Sparkles } from "lucide-react";
import { ROUTES } from "../../../constants";
import SectionHeading from "./SectionHeading";

const items = [
  { icon: Camera, title: "Portret & Editorial", desc: "Ședințe de studio cu direcție artistică, lumină dramatică și retușare profesională." },
  { icon: Heart, title: "Nunți & Evenimente", desc: "Povestea zilei tale surprinsă natural, fără să forțăm momentele. Livrare rapidă." },
  { icon: Sparkles, title: "Branding & Fashion", desc: "Imagini care definesc brandul — campanii, lookbook-uri, portrete corporate." },
];

export default function ServicesTeaser() {
  return (
    <section className="px-6 py-20 md:px-10 md:py-28 bg-stone-900/30">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading eyebrow="Ce Oferim" title="Servicii" />

        <div className="grid gap-6 md:grid-cols-3">
          {items.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="group border border-stone-800 bg-stone-950/40 p-8 transition-all duration-500 hover:border-gold-400/30">
              <div className="mb-5 flex h-12 w-12 items-center justify-center border border-gold-400/30 bg-gold-400/5 text-gold-400 transition-colors group-hover:bg-gold-400/10">
                <Icon size={22} />
              </div>
              <h3 className="font-serif text-xl font-semibold text-stone-100">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-400">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            to={ROUTES.services}
            className="group inline-flex items-center gap-3 border-b border-gold-400/40 pb-1 text-sm font-medium tracking-widest uppercase text-gold-400 transition-all hover:border-gold-400"
          >
            Vezi pachete & prețuri
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
