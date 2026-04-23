import { useParams, Navigate } from "react-router-dom";
import { photographers, portfolioImages, teamMembers } from "../../data/mock";
import AvailabilityCalendar from "../../components/availability/AvailabilityCalendar";
import ProfileHeader from "./ProfileHeader";
import PortfolioGallery from "./PortfolioGallery";
import OtherPhotographers from "./OtherPhotographers";

const CATEGORY_BY_ROLE: Record<string, string> = {
  "Editorial & Fashion": "fashion",
  "Nunți & Evenimente": "wedding",
  "Portrete Artistice": "portrait",
};

export default function PhotographerPage() {
  const { id } = useParams();

  const member = teamMembers.find((m) => m.id === id);
  if (!member) return <Navigate to="/404" replace />;

  const photographer = photographers.find((p) => p.id === id);
  const category = CATEGORY_BY_ROLE[member.role] ?? "all";
  const photos = portfolioImages.filter((img) => img.category === category);
  const otherMembers = teamMembers.filter((m) => m.id !== id);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      <ProfileHeader member={member} />

      <section className="px-6 py-16 md:px-10">
        <div className="mx-auto w-full max-w-2xl">
          <AvailabilityCalendar
            photographerId={member.id}
            photographerName={member.name}
            initialBusyDates={photographer?.busyDates || []}
          />
        </div>
      </section>

      <PortfolioGallery firstName={member.name.split(" ")[0]} photos={photos} />
      <OtherPhotographers members={otherMembers} />

      <footer className="border-t border-stone-800/50 px-6 py-8 text-center">
        <p className="text-sm text-stone-600">&copy; 2026 Lumina Studio. Toate drepturile rezervate.</p>
      </footer>
    </div>
  );
}
