import { useParams, Navigate } from "react-router-dom";
import { photographersApi, portfolioApi } from "../../api";
import { useFetch } from "../../hooks/useFetch";
import AvailabilityCalendar from "../../components/availability/AvailabilityCalendar";
import ProfileHeader from "./ProfileHeader";
import PortfolioGallery from "./PortfolioGallery";
import OtherPhotographers from "./OtherPhotographers";

export default function PhotographerPage() {
  const { id: slug } = useParams();

  const { data: photographers, loading: loadingTeam } = useFetch(() => photographersApi.list(), []);
  const { data: allPhotos, loading: loadingPhotos } = useFetch(() => portfolioApi.list(), []);

  if (loadingTeam || loadingPhotos) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-950">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-stone-700 border-t-gold-400" />
      </div>
    );
  }

  const member = (photographers ?? []).find((p) => p.slug === slug);
  if (!member) return <Navigate to="/404" replace />;

  const photos = (allPhotos ?? []).filter((img) => img.photographerId === member.id);
  const others = (photographers ?? []).filter((p) => p.slug !== slug);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      <ProfileHeader member={member} />

      <section className="px-6 py-16 md:px-10">
        <div className="mx-auto w-full max-w-2xl">
          <AvailabilityCalendar
            photographerId={String(member.id)}
            photographerName={member.name}
            initialBusyDates={member.busyDates}
          />
        </div>
      </section>

      <PortfolioGallery firstName={member.name.split(" ")[0]} photos={photos} />
      <OtherPhotographers members={others} />

      <footer className="border-t border-stone-800/50 px-6 py-8 text-center">
        <p className="text-sm text-stone-600">&copy; 2026 Lumina Studio. Toate drepturile rezervate.</p>
      </footer>
    </div>
  );
}
