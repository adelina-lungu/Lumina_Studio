import { resolveImageUrl } from "../../api";
import type { PortfolioImageDto } from "../../api/types";

interface Props {
  firstName: string;
  photos: PortfolioImageDto[];
}

const aspectClass = (a: PortfolioImageDto["aspect"]) =>
  a === "Tall" ? "aspect-[3/4]" : a === "Wide" ? "aspect-[4/3]" : "aspect-square";

export default function PortfolioGallery({ firstName, photos }: Props) {
  return (
    <section id="portofoliu" className="px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-medium tracking-[0.3em] uppercase text-gold-400">Lucrari selectate</p>
          <h2 className="font-serif text-3xl font-semibold text-stone-100 sm:text-4xl">Portofoliul lui {firstName}</h2>
        </div>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {photos.map((img) => (
            <div key={img.id} className="group relative mb-4 overflow-hidden break-inside-avoid">
              <div className={`relative overflow-hidden ${aspectClass(img.aspect)}`}>
                <img src={resolveImageUrl(img.src)} alt={img.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="p-5">
                    <p className="text-xs font-medium tracking-[0.2em] uppercase text-gold-400">{img.category}</p>
                    <p className="mt-1 text-sm text-stone-300">{img.alt}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
