using AutoMapper;
using LuminaStudio.BusinessLayer.Core;
using LuminaStudio.BusinessLayer.Interfaces;
using LuminaStudio.Domain.Models.ContactMessage;
using LuminaStudio.Domain.Models.Responses;

namespace LuminaStudio.BusinessLayer.Structure;

public class ContactMessageExecution : ContactMessageActions, IContactMessageActions
{
    public ContactMessageExecution(IMapper mapper) : base(mapper) {}

    public List<ContactMessageDto> GetAll()
    {
        return GetAllExecution();
    }

    public ActionResponse Create(CreateContactMessageDto dto, int? userId)
    {
        return ActionResponse.SafeExecute(() => CreateExecution(dto, userId));
    }

    public ActionResponse MarkAsRead(int id)
    {
        return ActionResponse.SafeExecute(() => MarkAsReadExecution(id));
    }

    public ActionResponse MarkAsResolved(int id)
    {
        return ActionResponse.SafeExecute(() => MarkAsResolvedExecution(id));
    }
}
