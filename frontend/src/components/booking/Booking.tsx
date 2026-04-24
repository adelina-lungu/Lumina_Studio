import type { ServicePackageDto } from "../../api/types";
import BookingModal from "./BookingModal";
import PhotographerStep from "./PhotographerStep";
import CalendarStep from "./CalendarStep";
import PackageStep from "./PackageStep";
import DetailsStep from "./DetailsStep";
import SummaryCard from "./SummaryCard";
import { useBookingFlow } from "./useBookingFlow";

interface BookingProps {
  preselectedPackage: ServicePackageDto | null;
}

export default function Booking({ preselectedPackage }: BookingProps) {
  const flow = useBookingFlow(preselectedPackage);

  return (
    <>
      <section id="booking" className="px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-10 text-center md:mb-12">
            <p className="mb-3 text-sm font-medium tracking-[0.3em] uppercase text-gold-400">Rezervă Ședința</p>
            <h2 className="font-serif text-3xl font-semibold text-stone-100 sm:text-4xl md:text-5xl">Programare Online</h2>
          </div>

          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px] xl:gap-8">
            <div className="flex flex-col gap-5">
              <PhotographerStep selected={flow.selectedPhotographer} onChange={flow.changePhotographer} />
              <CalendarStep
                calendarDays={flow.calendarDays}
                monthLabel={flow.monthLabel}
                prevMonth={flow.prevMonth}
                nextMonth={flow.nextMonth}
                selectedDate={flow.selectedDate}
                setSelectedDate={flow.setSelectedDate}
                toDateStr={flow.toDateStr}
                isBusy={flow.isBusy}
                isPast={flow.isPast}
              />
              <PackageStep
                selectedPackage={flow.selectedPackage}
                onSelectPackage={flow.setSelectedPackage}
                peopleCount={flow.peopleCount}
                setPeopleCount={flow.setPeopleCount}
              />
              <DetailsStep
                clientName={flow.clientName}
                setClientName={flow.setClientName}
                clientEmail={flow.clientEmail}
                setClientEmail={flow.setClientEmail}
              />
            </div>

            <div>
              <SummaryCard
                selectedPhotographer={flow.selectedPhotographer}
                selectedDate={flow.selectedDate}
                selectedPackage={flow.selectedPackage}
                peopleCount={flow.peopleCount}
                clientName={flow.clientName}
                clientEmail={flow.clientEmail}
                canSubmit={flow.canSubmit}
                handleConfirm={flow.handleConfirm}
              />
            </div>
          </div>
        </div>
      </section>

      <BookingModal
        open={flow.modalOpen}
        onClose={() => flow.setModalOpen(false)}
        photographerName={flow.selectedPhotographer.name}
        date={flow.selectedDate}
      />
    </>
  );
}
