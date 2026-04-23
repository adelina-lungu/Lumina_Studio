using AutoMapper;
using LuminaStudio.BusinessLayer.Interfaces;
using LuminaStudio.Domain.Models.ContactMessage;
using LuminaStudio.Domain.Models.Responses;

namespace LuminaStudio.BusinessLayer.Structure;

public class ContactMessageExecution : IContactMessageActions
{
    private readonly IMapper _mapper;

    public ContactMessageExecution(IMapper mapper)
    {
        _mapper = mapper;
    }

    public List<ContactMessageDto> GetAll() => throw new NotImplementedException();
    public ActionResponse Create(CreateContactMessageDto dto, int? userId) => throw new NotImplementedException();
    public ActionResponse MarkAsRead(int id) => throw new NotImplementedException();
    public ActionResponse MarkAsResolved(int id) => throw new NotImplementedException();
}
