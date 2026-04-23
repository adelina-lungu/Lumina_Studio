import { Link } from "react-router-dom";
import { ArrowRight, Quote, Star } from "lucide-react";
import { testimonialsApi } from "../../../api";
import { useFetch } from "../../../hooks/useFetch";
import { ROUTES } from "../../../constants";
import SectionHeading from "./SectionHeading";

export default function TestimonialStrip() {
  const { data: testimonials, loading } = useFetch(() => testimonialsApi.list(), []);
  const featured = (testimonials ?? []).slice(0, 2);

  return (
    <section className="px-6 py-20 md:px-10 md:py-28 bg-stone-900/30">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading eyebrow="Ce Spun Clienții" title="Recenzii" />

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="animate-pulse border border-stone-800 bg-stone-950/40 p-8">
                <div className="mb-4 h-4 w-24 rounded bg-stone-800" />
                <div className="space-y-2">
                  <div className="h-4 w-full rounded bg-stone-800/60" />
                  <div className="h-4 w-3/4 rounded bg-stone-800/60" />
                </div>
                <div className="mt-6 flex items-center gap-3 border-t border-stone-800 pt-5">
                  <div className="h-10 w-10 rounded-full bg-stone-800" />
                  <div className="h-4 w-24 rounded bg-stone-800" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {featured.map((t) => (
              <article key={t.id} className="relative border border-stone-800 bg-stone-950/40 p-8">
                <Quote size={28} className="absolute -top-3 left-6 bg-stone-900 px-1 text-gold-400" />
                <div className="mb-4 flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-stone-300">"{t.text}"</p>
                <div className="mt-6 flex items-center gap-3 border-t border-stone-800 pt-5">
                  {t.avatarUrl && (
                    <img src={t.avatarUrl} alt={t.name} loading="lazy" className="h-10 w-10 rounded-full object-cover" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-stone-100">{t.name}</p>
                    <p className="text-xs text-stone-500">{t.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-12 flex justify-center">
          <Link
            to={ROUTES.testimonials}
            className="group inline-flex items-center gap-3 border-b border-gold-400/40 pb-1 text-sm font-medium tracking-widest uppercase text-gold-400 transition-all hover:border-gold-400"
          >
            Toate recenziile
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
