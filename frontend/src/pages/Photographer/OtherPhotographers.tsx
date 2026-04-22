import { useNavigate } from "react-router-dom";
import type { TeamMember } from "../../data/mock";
import { ROUTES } from "../../constants";

interface Props {
  members: TeamMember[];
}

export default function OtherPhotographers({ members }: Props) {
  const navigate = useNavigate();

  return (
    <section className="px-6 py-16 md:px-10 border-t border-stone-800/50">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-10 text-center">
          <p className="text-sm font-medium tracking-[0.3em] uppercase text-stone-500">Descopera si</p>
          <h3 className="mt-2 font-serif text-2xl font-semibold text-stone-100">Ceilalti fotografi</h3>
        </div>

        <div className="flex justify-center gap-10 sm:gap-16">
          {members.map((m) => (
            <button
              key={m.id}
              onClick={() => navigate(ROUTES.photographer(m.id))}
              className="group flex cursor-pointer flex-col items-center gap-3 transition-all duration-500"
            >
              <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-stone-700 transition-all duration-500 group-hover:border-gold-400 sm:h-28 sm:w-28">
                <img src={m.avatar} alt={m.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-stone-100 transition-colors group-hover:text-gold-400">{m.name}</p>
                <p className="text-[11px] tracking-wide text-stone-500">{m.role}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
