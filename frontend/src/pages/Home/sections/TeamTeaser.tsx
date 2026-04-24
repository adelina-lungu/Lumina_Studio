import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { photographersApi } from "../../../api";
import { useFetch } from "../../../hooks/useFetch";
import { ROUTES } from "../../../constants";
import SectionHeading from "./SectionHeading";

export default function TeamTeaser() {
  const { data: photographers, loading } = useFetch(() => photographersApi.list(), []);
  const members = (photographers ?? []).slice(0, 3);

  return (
    <section className="px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading eyebrow="Fotografi" title="Echipa" />

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-stone-800/50" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {members.map((m) => (
              <Link
                key={m.id}
                to={`/photographer/${m.slug}`}
                className="group block overflow-hidden"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={m.avatarUrl}
                    alt={m.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-xs font-medium tracking-[0.2em] uppercase text-gold-400">{m.specialty}</p>
                    <h3 className="mt-1 font-serif text-xl font-semibold text-stone-100">{m.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-12 flex justify-center">
          <Link
            to={ROUTES.team}
            className="group inline-flex items-center gap-3 border-b border-gold-400/40 pb-1 text-sm font-medium tracking-widest uppercase text-gold-400 transition-all hover:border-gold-400"
          >
            Cunoaște toată echipa
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
