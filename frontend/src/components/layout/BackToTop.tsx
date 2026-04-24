import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Înapoi sus"
      className="fixed bottom-6 right-6 z-50 flex h-11 w-11 cursor-pointer
        items-center justify-center rounded-full border border-stone-700
        bg-stone-900/90 text-stone-400 backdrop-blur-sm
        transition-all duration-300 hover:border-gold-400/50
        hover:text-gold-400 hover:scale-110
        animate-fade-in-up"
    >
      <ArrowUp size={18} />
    </button>
  );
}