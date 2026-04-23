using LuminaStudio.Domain.Models.ContactMessage;
using LuminaStudio.Domain.Models.Responses;

namespace LuminaStudio.BusinessLayer.Interfaces
{
    public interface IContactMessageActions
    {
        List<ContactMessageDto> GetAll();
        ActionResponse Create(CreateContactMessageDto dto, int? userId);
        ActionResponse MarkAsRead(int id);
        ActionResponse MarkAsResolved(int id);
    }
}
