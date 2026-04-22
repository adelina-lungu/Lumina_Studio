import Booking from "../../components/Booking";

export default function BookingPage() {
  return (
    <main className="pt-24 md:pt-28">
      <Booking preselectedPackage={null} />
    </main>
  );
}
