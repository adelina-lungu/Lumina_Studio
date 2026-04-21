interface BookingSectionProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

export default function BookingSection({ icon, title, children }: BookingSectionProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-stone-800 bg-stone-900/30">
      <div className="flex items-center gap-2 border-b border-stone-800 px-4 py-3 sm:px-5">
        <span className="text-gold-400">{icon}</span>
        <h3 className="text-xs font-semibold tracking-wide uppercase text-stone-200">{title}</h3>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}
