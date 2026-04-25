import { ArrowRight, Camera, Facebook, Globe, Instagram } from "lucide-react";
import type { PhotographerDto } from "../../api/types";

interface Props {
  member: PhotographerDto;
}

export default function ProfileHeader({ member }: Props) {
  return (
    <>
      <section className="relative min-h-[70vh] flex items-end">
        <div className="absolute inset-0">
          {member.coverUrl && <img src={member.coverUrl} alt={member.name} className="h-full w-full object-cover" />}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-stone-950/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-transparent to-transparent" />
        </div>

<div className="relative z-10 w-full px-6 pb-16 pt-32 md:px-10 md:pb-20">
          <div className="mx-auto w-full max-w-6xl">
            <div className="flex items-end gap-6 sm:gap-8">
              {member.avatarUrl && (
                <img
                  src={member.avatarUrl}
                  alt={member.name}
                  className="h-28 w-28 shrink-0 rounded-full border-4 border-stone-950 object-cover shadow-2xl sm:h-36 sm:w-36"
                />
              )}

              <div className="min-w-0 flex-1">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-1.5 backdrop-blur-sm">
                  <Camera size={12} className="text-gold-400" />
                  <span className="text-xs font-medium tracking-[0.2em] uppercase text-gold-400">{member.specialty}</span>
                </div>

                <h1 className="font-serif text-4xl font-semibold text-stone-50 sm:text-5xl lg:text-6xl">{member.name}</h1>

                {member.bio && (
                  <p className="mt-4 text-sm leading-relaxed text-stone-300 sm:text-base max-w-xl">{member.bio}</p>
                )}

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  {member.instagramUrl && <SocialLink href={member.instagramUrl} icon={<Instagram size={16} />} />}
                  {member.facebookUrl && <SocialLink href={member.facebookUrl} icon={<Facebook size={16} />} />}
                  {member.websiteUrl && <SocialLink href={member.websiteUrl} icon={<Globe size={16} />} />}
                  <a href="#portofoliu" className="ml-1 inline-flex items-center gap-2 border border-gold-400/40 bg-gold-400/10 px-5 py-2.5 text-xs font-medium tracking-widest uppercase text-gold-400 backdrop-blur-sm transition-all duration-300 hover:border-gold-400 hover:bg-gold-400/20">
                    Vezi lucrările
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
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
