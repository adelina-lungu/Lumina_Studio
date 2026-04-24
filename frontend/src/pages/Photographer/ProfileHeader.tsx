import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Award, Camera, Facebook, Globe, Heart, Instagram } from "lucide-react";
import type { PhotographerDto } from "../../api/types";
import { ROUTES } from "../../constants";

interface Props {
  member: PhotographerDto;
}

export default function ProfileHeader({ member }: Props) {
  const navigate = useNavigate();

  const stats = [
    { icon: <Camera size={16} />, value: "240+", label: "Sedinte foto" },
    { icon: <Heart size={16} />, value: "98%", label: "Clienti multumiti" },
    { icon: <Award size={16} />, value: String(member.displayOrder + 3), label: "Premii" },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-stone-950/60 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 md:px-10">
          <button onClick={() => navigate(ROUTES.home)} className="flex cursor-pointer items-center gap-2 text-stone-400 transition-colors hover:text-gold-400">
            <ArrowLeft size={18} />
            <span className="text-sm font-medium hidden sm:inline">Inapoi la pagina principala</span>
          </button>
          <Link to={ROUTES.home} className="font-serif text-xl font-semibold tracking-[0.2em] text-stone-100">
            LUMINA
          </Link>
          <div className="w-20" />
        </div>
      </div>

      <section className="relative min-h-screen flex items-end">
        <div className="absolute inset-0">
          {member.coverUrl && <img src={member.coverUrl} alt={member.name} className="h-full w-full object-cover" />}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-stone-950/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 w-full px-6 pb-16 pt-32 md:px-10 md:pb-24">
          <div className="mx-auto w-full max-w-6xl">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-1.5 backdrop-blur-sm">
                <Camera size={12} className="text-gold-400" />
                <span className="text-xs font-medium tracking-[0.2em] uppercase text-gold-400">{member.specialty}</span>
              </div>

              <h1 className="font-serif text-5xl font-semibold text-stone-50 sm:text-6xl lg:text-7xl">{member.name}</h1>

              {member.bio && (
                <p className="mt-6 text-base leading-relaxed text-stone-300 sm:text-lg max-w-xl">{member.bio}</p>
              )}

              <div className="mt-8 flex flex-wrap gap-6">
                {stats.map((s) => (
                  <div key={s.label} className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-400/20 bg-gold-400/5 text-gold-400">{s.icon}</div>
                    <div>
                      <p className="font-serif text-lg font-bold text-stone-100">{s.value}</p>
                      <p className="text-[11px] tracking-wide text-stone-500">{s.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                {member.instagramUrl && <SocialLink href={member.instagramUrl} icon={<Instagram size={16} />} />}
                {member.facebookUrl && <SocialLink href={member.facebookUrl} icon={<Facebook size={16} />} />}
                {member.websiteUrl && <SocialLink href={member.websiteUrl} icon={<Globe size={16} />} />}
                <a href="#portofoliu" className="ml-2 inline-flex items-center gap-2 border border-gold-400/40 bg-gold-400/10 px-6 py-3 text-sm font-medium tracking-widest uppercase text-gold-400 backdrop-blur-sm transition-all duration-300 hover:border-gold-400 hover:bg-gold-400/20">
                  Vezi lucrarile
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
          <div className="h-12 w-px bg-gradient-to-b from-transparent via-gold-400/50 to-transparent animate-bounce" />
        </div>
      </section>
    </>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-600/50 bg-stone-900/50 text-stone-300 backdrop-blur-sm transition-all hover:border-gold-400 hover:text-gold-400">
      {icon}
    </a>
  );
}
