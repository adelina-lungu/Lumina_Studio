import { useState } from "react";
import { portfolioImages } from "../data/mock";
import type { PortfolioImage } from "../data/mock";

const categories = [
  { key: "all", label: "Toate" },
  { key: "fashion", label: "Fashion" },
  { key: "wedding", label: "Nunți" },
  { key: "portrait", label: "Portrete" },
] as const;

type Category = (typeof categories)[number]["key"];

export default function Portfolio() {
  const [active, setActive] = useState<Category>("all");

  const filtered =
    active === "all"
      ? portfolioImages
      : portfolioImages.filter((img) => img.category === active);

  return (
    <section id="portfolio" className="px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto w-full max-w-6xl">
        {/* Heading */}
        <div className="mb-12 text-center md:mb-16">
          <p className="mb-3 text-sm font-medium tracking-[0.3em] uppercase text-gold-400">
            Lucrări Selectate
          </p>
          <h2 className="font-serif text-3xl font-semibold text-stone-100 sm:text-4xl md:text-5xl">
            Portofoliu
          </h2>
        </div>

        {/* Filter tabs */}
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

        {/* Masonry grid */}
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {filtered.map((img) => (
            <PortfolioCard key={img.id} image={img} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PortfolioCard({ image }: { image: PortfolioImage }) {
  const aspectClass =
    image.aspect === "tall"
      ? "aspect-[3/4]"
      : image.aspect === "wide"
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
        {/* Hover overlay */}
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
