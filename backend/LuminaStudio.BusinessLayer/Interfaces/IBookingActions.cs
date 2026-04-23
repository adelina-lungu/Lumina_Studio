using LuminaStudio.Domain.Models.Booking;
using LuminaStudio.Domain.Models.Responses;

namespace LuminaStudio.BusinessLayer.Interfaces
{
    public interface IBookingActions
    {
        BookingDto? GetById(int id);
        List<BookingDto> GetByUserId(int userId);
        BookingPageDto GetAll(BookingFilterDto filter);
        ActionResponse Create(CreateBookingDto dto, int userId);
        ActionResponse Cancel(int id, int userId);
        ActionResponse Confirm(int id);
        ActionResponse Complete(int id);
    }
}
