using AutoMapper;
using LuminaStudio.BusinessLayer.Interfaces;
using LuminaStudio.Domain.Models.Booking;
using LuminaStudio.Domain.Models.Responses;

namespace LuminaStudio.BusinessLayer.Structure;

public class BookingExecution : IBookingActions
{
    private readonly IMapper _mapper;

    public BookingExecution(IMapper mapper)
    {
        _mapper = mapper;
    }

    public BookingDto? GetById(int id) => throw new NotImplementedException();
    public List<BookingDto> GetByUserId(int userId) => throw new NotImplementedException();
    public BookingPageDto GetAll(BookingFilterDto filter) => throw new NotImplementedException();
    public ActionResponse Create(CreateBookingDto dto, int userId) => throw new NotImplementedException();
    public ActionResponse Cancel(int id, int userId) => throw new NotImplementedException();
    public ActionResponse Confirm(int id) => throw new NotImplementedException();
    public ActionResponse Complete(int id) => throw new NotImplementedException();
}
