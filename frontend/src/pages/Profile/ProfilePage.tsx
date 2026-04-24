import { Navigate } from "react-router-dom";
import { useProfile } from "./useProfile";
import ProfileInfo from "./ProfileInfo";
import BookingHistory from "./BookingHistory";

export default function ProfilePage() {
  const profile = useProfile();

  if (!profile.user) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      <ProfileInfo
        user={profile.user}
        editName={profile.editName}
        setEditName={profile.setEditName}
        editPhone={profile.editPhone}
        setEditPhone={profile.setEditPhone}
        hasChanges={profile.hasChanges}
        saved={profile.saved}
        error={profile.error}
        onSave={profile.save}
      />
      <div className="mx-auto w-full max-w-2xl px-6">
        <div className="h-px w-full bg-stone-800/50" />
      </div>
      <BookingHistory bookings={profile.bookings} loading={profile.bookingsLoading} />
    </div>
  );
}
