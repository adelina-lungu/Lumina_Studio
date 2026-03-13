import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "../data/mock";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () =>
    setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  const t = testimonials[current];

  return (
    <section id="testimonials" className="px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-12 text-center md:mb-16">
          <p className="mb-3 text-sm font-medium tracking-[0.3em] uppercase text-gold-400">
            Recenzii
          </p>
          <h2 className="font-serif text-3xl font-semibold text-stone-100 sm:text-4xl md:text-5xl">
            Ce Spun Clienții
          </h2>
        </div>

        <div className="relative mx-auto max-w-3xl">
          <div className="rounded-lg border border-stone-800 bg-stone-900/30 p-8 text-center sm:p-12">
            <Quote size={32} className="mx-auto mb-6 text-gold-400/30" />

            <p className="font-serif text-lg leading-relaxed text-stone-300 italic sm:text-xl">
              "{t.text}"
            </p>

            <div className="mt-6 flex justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < t.rating
                      ? "fill-gold-400 text-gold-400"
                      : "text-stone-700"
                  }
                />
              ))}
            </div>

            <div className="mt-6 flex flex-col items-center gap-3">
              <img
                src={t.avatar}
                alt={t.name}
                className="h-14 w-14 rounded-full object-cover ring-2 ring-gold-400/30"
              />
              <div>
                <p className="text-sm font-semibold text-stone-100">{t.name}</p>
                <p className="text-xs text-stone-500">{t.role}</p>
              </div>
            </div>
          </div>

          <button
            onClick={prev}
            aria-label="Testimonial anterior"
            className="absolute left-0 top-1/2 -translate-x-4 -translate-y-1/2
              flex h-10 w-10 cursor-pointer items-center justify-center rounded-full
              border border-stone-800 bg-stone-950/80 text-stone-400
              transition-all hover:border-gold-400/50 hover:text-gold-400
              sm:-translate-x-6"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            aria-label="Testimonial următor"
            className="absolute right-0 top-1/2 translate-x-4 -translate-y-1/2
              flex h-10 w-10 cursor-pointer items-center justify-center rounded-full
              border border-stone-800 bg-stone-950/80 text-stone-400
              transition-all hover:border-gold-400/50 hover:text-gold-400
              sm:translate-x-6"
          >
            <ChevronRight size={18} />
          </button>

          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === current
                    ? "w-6 bg-gold-400"
                    : "w-2 bg-stone-700 hover:bg-stone-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}