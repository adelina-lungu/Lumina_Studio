using AutoMapper;
using LuminaStudio.BusinessLayer.Interfaces;
using LuminaStudio.Domain.Models.Chat;
using LuminaStudio.Domain.Models.Responses;

namespace LuminaStudio.BusinessLayer.Structure;

public class ChatExecution : IChatActions
{
    private readonly IMapper _mapper;

    public ChatExecution(IMapper mapper)
    {
        _mapper = mapper;
    }

    public ChatConversationDto? GetConversationById(int id) => throw new NotImplementedException();
    public List<ChatConversationDto> GetAll() => throw new NotImplementedException();
    public ChatConversationDto? GetOrCreateByEmail(string clientEmail, string clientName, int? userId) => throw new NotImplementedException();
    public ActionResponse SendMessage(int conversationId, SendChatMessageDto dto, string senderName, bool isStudio) => throw new NotImplementedException();
    public ActionResponse MarkAsRead(int conversationId) => throw new NotImplementedException();
}
