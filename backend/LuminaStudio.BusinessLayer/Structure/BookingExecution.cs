using AutoMapper;
using LuminaStudio.BusinessLayer.Core;
using LuminaStudio.BusinessLayer.Interfaces;
using LuminaStudio.Domain.Models.Booking;
using LuminaStudio.Domain.Models.Responses;

namespace LuminaStudio.BusinessLayer.Structure;

public class BookingExecution : BookingActions, IBookingActions
{
    public BookingExecution(IMapper mapper) : base(mapper) {}

    public BookingDto? GetById(int id)
    {
        return GetByIdExecution(id);
    }

    public List<BookingDto> GetByUserId(int userId)
    {
        return GetByUserIdExecution(userId);
    }

    public BookingPageDto GetAll(BookingFilterDto filter)
    {
        return GetAllExecution(filter);
    }

    public ActionResponse Create(CreateBookingDto dto, int userId)
    {
        return CreateExecution(dto, userId);
    }

    public ActionResponse Cancel(int id, int userId)
    {
        return CancelExecution(id, userId);
    }

    public ActionResponse Confirm(int id)
    {
        return ConfirmExecution(id);
    }

    public ActionResponse Complete(int id)
    {
        return CompleteExecution(id);
    }
}
