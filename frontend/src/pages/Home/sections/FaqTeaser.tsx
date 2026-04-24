import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Minus, Plus } from "lucide-react";
import { faqApi } from "../../../api";
import { useFetch } from "../../../hooks/useFetch";
import { ROUTES } from "../../../constants";
import SectionHeading from "./SectionHeading";

export default function FaqTeaser() {
  const { data: faqItems, loading } = useFetch(() => faqApi.list(), []);
  const items = faqItems ?? [];
  const featured = items.slice(0, 3);
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <section className="px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto w-full max-w-3xl">
        <SectionHeading eyebrow="Întrebări Frecvente" title="FAQ" />

        <div className="divide-y divide-stone-800 border-y border-stone-800">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse py-5">
                  <div className="h-5 w-3/4 rounded bg-stone-800" />
                </div>
              ))
            : featured.map((item) => {
                const open = openId === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setOpenId(open ? null : item.id)}
                    className="group block w-full cursor-pointer py-5 text-left"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-serif text-lg text-stone-100 transition-colors group-hover:text-gold-400">
                        {item.question}
                      </span>
                      {open ? (
                        <Minus size={18} className="shrink-0 text-gold-400" />
                      ) : (
                        <Plus size={18} className="shrink-0 text-stone-500 group-hover:text-gold-400" />
                      )}
                    </div>
                    {open && (
                      <p className="mt-3 text-sm leading-relaxed text-stone-400">{item.answer}</p>
                    )}
                  </button>
                );
              })
          }
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            to={ROUTES.faq}
            className="group inline-flex items-center gap-3 border-b border-gold-400/40 pb-1 text-sm font-medium tracking-widest uppercase text-gold-400 transition-all hover:border-gold-400"
          >
            Toate întrebările
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
