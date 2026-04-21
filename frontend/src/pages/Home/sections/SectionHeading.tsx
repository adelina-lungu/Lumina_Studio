interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  align?: "center" | "left";
}

export default function SectionHeading({ eyebrow, title, align = "center" }: SectionHeadingProps) {
  return (
    <div className={`mb-12 md:mb-16 ${align === "center" ? "text-center" : "text-left"}`}>
      <p className="mb-3 text-sm font-medium tracking-[0.3em] uppercase text-gold-400">{eyebrow}</p>
      <h2 className="font-serif text-3xl font-semibold text-stone-100 sm:text-4xl md:text-5xl">{title}</h2>
    </div>
  );
}
