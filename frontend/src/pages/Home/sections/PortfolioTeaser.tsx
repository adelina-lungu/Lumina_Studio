import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { portfolioApi, resolveImageUrl } from "../../../api";
import { useFetch } from "../../../hooks/useFetch";
import { ROUTES } from "../../../constants";
import SectionHeading from "./SectionHeading";

export default function PortfolioTeaser() {
  const { data: images, loading } = useFetch(() => portfolioApi.list(), []);
  const featured = (images ?? []).slice(0, 6);

  return (
    <section className="px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading eyebrow="Lucrări Selectate" title="Portofoliu" />

        {loading ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={`animate-pulse bg-stone-800/50 ${i === 0 ? "row-span-2 aspect-[3/4]" : "aspect-square"}`} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {featured.map((img, i) => (
              <Link
                key={img.id}
                to={ROUTES.portfolio}
                className={`group relative overflow-hidden ${i === 0 ? "row-span-2 aspect-[3/4] md:col-span-1" : "aspect-square"}`}
              >
                <img
                  src={resolveImageUrl(img.src)}
                  alt={img.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-stone-950/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        )}

        <div className="mt-12 flex justify-center">
          <Link
            to={ROUTES.portfolio}
            className="group inline-flex items-center gap-3 border-b border-gold-400/40 pb-1 text-sm font-medium tracking-widest uppercase text-gold-400 transition-all hover:border-gold-400"
          >
            Vezi tot portofoliul
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
