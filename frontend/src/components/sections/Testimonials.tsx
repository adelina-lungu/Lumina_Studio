import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote, Send } from "lucide-react";
import { testimonialsApi, useApiHandler } from "../../api";
import { useFetch } from "../../hooks/useFetch";
import { useAuth } from "../../contexts/AuthContext";
import type { TestimonialDto } from "../../api/types";

export default function Testimonials() {
  const { data: testimonials, loading, refetch } = useFetch(() => testimonialsApi.list(), []);
  const [current, setCurrent] = useState(0);

  const items = testimonials ?? [];

  if (loading) {
    return (
      <section id="testimonials" className="px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-12 text-center md:mb-16">
            <p className="mb-3 text-sm font-medium tracking-[0.3em] uppercase text-gold-400">Recenzii</p>
            <h2 className="font-serif text-3xl font-semibold text-stone-100 sm:text-4xl md:text-5xl">Ce Spun Clienții</h2>
          </div>
          <div className="mx-auto max-w-3xl animate-pulse rounded-lg border border-stone-800 bg-stone-900/30 p-12">
            <div className="mx-auto h-6 w-3/4 rounded bg-stone-800" />
            <div className="mx-auto mt-4 h-6 w-1/2 rounded bg-stone-800" />
            <div className="mx-auto mt-8 h-14 w-14 rounded-full bg-stone-800" />
          </div>
        </div>
      </section>
    );
  }

  const t = items.length > 0 ? items[current] : null;
  const prev = () => setCurrent((c) => (c === 0 ? items.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === items.length - 1 ? 0 : c + 1));

  return (
    <section id="testimonials" className="px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-12 text-center md:mb-16">
          <p className="mb-3 text-sm font-medium tracking-[0.3em] uppercase text-gold-400">Recenzii</p>
          <h2 className="font-serif text-3xl font-semibold text-stone-100 sm:text-4xl md:text-5xl">Ce Spun Clienții</h2>
        </div>

        {t && (
          <div className="relative mx-auto max-w-3xl">
            <TestimonialCard testimonial={t} />

            <button
              onClick={prev}
              aria-label="Testimonial anterior"
              className="absolute left-0 top-1/2 -translate-x-4 -translate-y-1/2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-stone-800 bg-stone-950/80 text-stone-400 transition-all hover:border-gold-400/50 hover:text-gold-400 sm:-translate-x-6"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              aria-label="Testimonial următor"
              className="absolute right-0 top-1/2 translate-x-4 -translate-y-1/2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-stone-800 bg-stone-950/80 text-stone-400 transition-all hover:border-gold-400/50 hover:text-gold-400 sm:translate-x-6"
            >
              <ChevronRight size={18} />
            </button>

            <div className="mt-6 flex justify-center gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Testimonial ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    i === current ? "w-6 bg-gold-400" : "w-2 bg-stone-700 hover:bg-stone-600"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {items.length === 0 && (
          <div className="mx-auto max-w-3xl rounded-lg border border-dashed border-stone-800 px-6 py-14 text-center">
            <Quote size={32} className="mx-auto mb-3 text-stone-700" />
            <p className="text-sm text-stone-500">Încă nu sunt recenzii. Fii primul care lasă o recenzie!</p>
          </div>
        )}

        <ReviewForm onSubmitted={refetch} />
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial: t }: { testimonial: TestimonialDto }) {
  return (
    <div className="rounded-lg border border-stone-800 bg-stone-900/30 p-8 text-center sm:p-12">
      <Quote size={32} className="mx-auto mb-6 text-gold-400/30" />
      <p className="font-serif text-lg leading-relaxed text-stone-300 italic sm:text-xl">"{t.text}"</p>
      <div className="mt-6 flex justify-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={16} className={i < t.rating ? "fill-gold-400 text-gold-400" : "text-stone-700"} />
        ))}
      </div>
      <div className="mt-6 flex flex-col items-center gap-3">
        {t.avatarUrl && (
          <img src={t.avatarUrl} alt={t.name} className="h-14 w-14 rounded-full object-cover ring-2 ring-gold-400/30" />
        )}
        <div>
          <p className="text-sm font-semibold text-stone-100">{t.name}</p>
          <p className="text-xs text-stone-500">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

function ReviewForm({ onSubmitted }: { onSubmitted: () => void }) {
  const { user } = useAuth();
  const { call, addToast } = useApiHandler();

  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!user) {
    return (
      <div className="mx-auto mt-16 max-w-2xl rounded-lg border border-stone-800 bg-stone-900/30 px-6 py-10 text-center">
        <p className="text-sm text-stone-500">Autentifică-te pentru a lăsa o recenzie.</p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="mx-auto mt-16 max-w-2xl rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-6 py-10 text-center">
        <p className="text-sm font-medium text-emerald-400">Mulțumim pentru recenzie! Va fi publicată după aprobare.</p>
      </div>
    );
  }

  const canSubmit = text.trim().length >= 10 && rating > 0 && !submitting;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    const res = await call(() =>
      testimonialsApi.create({
        name: user.name,
        role: "Client",
        avatarUrl: "",
        text: text.trim(),
        rating,
      })
    );
    setSubmitting(false);
    if (res) {
      addToast("success", "Recenzia a fost trimisă cu succes!");
      setSubmitted(true);
      onSubmitted();
    }
  };

  return (
    <div className="mx-auto mt-16 max-w-2xl">
      <h3 className="mb-6 text-center text-sm font-medium tracking-[0.2em] uppercase text-stone-500">Lasă o recenzie</h3>

      <div className="rounded-lg border border-stone-800 bg-stone-900/30 p-6 sm:p-8">
        <div className="mb-5">
          <p className="mb-2 text-xs font-medium tracking-wide text-stone-400">Rating <span className="text-red-400">*</span></p>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setRating(i + 1)}
                onMouseEnter={() => setHoverRating(i + 1)}
                onMouseLeave={() => setHoverRating(0)}
                className="cursor-pointer p-0.5 transition-transform hover:scale-110"
              >
                <Star
                  size={24}
                  className={
                    i < (hoverRating || rating)
                      ? "fill-gold-400 text-gold-400"
                      : "text-stone-700"
                  }
                />
              </button>
            ))}
          </div>
          {rating === 0 && <p className="mt-1 text-xs text-stone-600">Selectează un rating</p>}
        </div>

        <div className="mb-5">
          <label className="mb-1.5 block text-xs font-medium tracking-wide text-stone-400">
            Mesaj <span className="text-red-400">*</span>
            <span className="ml-2 text-stone-600">({text.length}/1000)</span>
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Spune-ne despre experiența ta cu LUMINA Studio..."
            rows={4}
            maxLength={1000}
            className="w-full rounded-lg border border-stone-800 bg-stone-950/60 px-4 py-2.5 text-sm text-stone-100 placeholder-stone-600 outline-none transition-colors resize-none focus:border-gold-400/50"
          />
          {text.length > 0 && text.trim().length < 10 && (
            <p className="mt-1 text-xs text-red-400">Minim 10 caractere.</p>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-gold-400 py-3 text-xs font-semibold tracking-widest uppercase text-stone-950 transition-all duration-300 hover:bg-gold-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Send size={14} />
          {submitting ? "Se trimite..." : "Trimite recenzia"}
        </button>
      </div>
    </div>
  );
}
