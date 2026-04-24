import Booking from "../../components/booking/Booking";

export default function BookingPage() {
  return (
    <main className="pt-24 md:pt-28">
      <Booking preselectedPackage={null} />
    </main>
  );
}
