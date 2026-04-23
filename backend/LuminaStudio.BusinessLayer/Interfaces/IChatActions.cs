using LuminaStudio.Domain.Models.Chat;
using LuminaStudio.Domain.Models.Responses;

namespace LuminaStudio.BusinessLayer.Interfaces
{
    public interface IChatActions
    {
        ChatConversationDto? GetConversationById(int id);
        List<ChatConversationDto> GetAll();
        ChatConversationDto? GetOrCreateByEmail(string clientEmail, string clientName, int? userId);
        ActionResponse SendMessage(int conversationId, SendChatMessageDto dto, string senderName, bool isStudio);
        ActionResponse MarkAsRead(int conversationId);
    }
}
