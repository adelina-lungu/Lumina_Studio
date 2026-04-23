import { useState } from "react";
import { portfolioApi } from "../../api";
import { useFetch } from "../../hooks/useFetch";
import type { PortfolioImageDto } from "../../api/types";

const categories = [
  { key: "all", label: "Toate" },
  { key: "Fashion", label: "Fashion" },
  { key: "Wedding", label: "Nunți" },
  { key: "Portrait", label: "Portrete" },
] as const;

type Category = (typeof categories)[number]["key"];

export default function Portfolio() {
  const [active, setActive] = useState<Category>("all");
  const { data: images, loading } = useFetch(() => portfolioApi.list(), []);

  const filtered =
    active === "all"
      ? images ?? []
      : (images ?? []).filter((img) => img.category === active);

  return (
    <section id="portfolio" className="px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-12 text-center md:mb-16">
          <p className="mb-3 text-sm font-medium tracking-[0.3em] uppercase text-gold-400">
            Lucrări Selectate
          </p>
          <h2 className="font-serif text-3xl font-semibold text-stone-100 sm:text-4xl md:text-5xl">
            Portofoliu
          </h2>
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-2 md:mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActive(cat.key)}
              className={`cursor-pointer rounded-none px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300 sm:px-5 ${
                active === cat.key
                  ? "bg-gold-400/15 text-gold-400 border border-gold-400/30"
                  : "text-stone-500 hover:text-stone-300 border border-transparent"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="mb-4 break-inside-avoid">
                <div className={`animate-pulse bg-stone-800/50 ${i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-[4/3]" : "aspect-square"}`} />
              </div>
            ))}
          </div>
        ) : (
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {filtered.map((img) => (
              <PortfolioCard key={img.id} image={img} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function PortfolioCard({ image }: { image: PortfolioImageDto }) {
  const aspectClass =
    image.aspect === "Tall"
      ? "aspect-[3/4]"
      : image.aspect === "Wide"
        ? "aspect-[4/3]"
        : "aspect-square";

  return (
      <div className="group relative mb-4 overflow-hidden break-inside-avoid">
      <div className={`relative overflow-hidden ${aspectClass}`}>
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="p-5 sm:p-6">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-gold-400">
              {image.category}
            </p>
            <p className="mt-1 text-sm text-stone-300">{image.alt}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
