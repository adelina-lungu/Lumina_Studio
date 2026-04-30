using AutoMapper;
using LuminaStudio.BusinessLayer.Core;
using LuminaStudio.BusinessLayer.Interfaces;
using LuminaStudio.Domain.Models.Chat;
using LuminaStudio.Domain.Models.Responses;

namespace LuminaStudio.BusinessLayer.Structure;

public class ChatExecution : ChatActions, IChatActions
{
    public ChatExecution(IMapper mapper) : base(mapper) {}

    public ChatConversationDto? GetConversationById(int id)
    {
        return GetConversationByIdExecution(id);
    }

    public List<ChatConversationDto> GetAll()
    {
        return GetAllExecution();
    }

    public ChatConversationDto? GetOrCreateByEmail(string clientEmail, string clientName, int? userId)
    {
        return GetOrCreateByEmailExecution(clientEmail, clientName, userId);
    }

    public ActionResponse SendMessage(int conversationId, SendChatMessageDto dto, string senderName, bool isStudio)
    {
        return ActionResponse.SafeExecute(() => SendMessageExecution(conversationId, dto, senderName, isStudio));
    }

    public ActionResponse MarkAsRead(int conversationId)
    {
        return ActionResponse.SafeExecute(() => MarkAsReadExecution(conversationId));
    }
}
