using AutoMapper;
using LuminaStudio.DataAccessLayer.Context;
using LuminaStudio.Domain.Entities.Chat;
using LuminaStudio.Domain.Enums;
using LuminaStudio.Domain.Models.Chat;
using LuminaStudio.Domain.Models.Responses;
using Microsoft.EntityFrameworkCore;

namespace LuminaStudio.BusinessLayer.Core
{
    public class ChatActions
    {
        protected readonly IMapper _mapper;

        protected ChatActions(IMapper mapper)
        {
            _mapper = mapper;
        }

        protected ChatConversationDto? GetConversationByIdExecution(int id)
        {
            using var context = new AppDbContext();

            var conversation = context.ChatConversations
                .Include(c => c.Messages.OrderBy(m => m.CreatedOn))
                .FirstOrDefault(c => c.Id == id);

            if (conversation == null)
                return null;

            return _mapper.Map<ChatConversationDto>(conversation);
        }

        protected List<ChatConversationDto> GetAllExecution()
        {
            using var context = new AppDbContext();

            var conversations = context.ChatConversations
                .Include(c => c.Messages)
                .Where(c => c.IsActive)
                .OrderByDescending(c => c.LastMessageAt ?? c.CreatedOn)
                .ToList();

            return conversations.Select(c => _mapper.Map<ChatConversationDto>(c)).ToList();
        }

        protected ChatConversationDto? GetOrCreateByEmailExecution(string clientEmail, string clientName, int? userId)
        {
            using var context = new AppDbContext();

            var conversation = context.ChatConversations
                .Include(c => c.Messages.OrderBy(m => m.CreatedOn))
                .FirstOrDefault(c => c.ClientEmail == clientEmail && c.IsActive);

            if (conversation != null)
                return _mapper.Map<ChatConversationDto>(conversation);

            var newConversation = new ChatConversationData
            {
                ClientEmail = clientEmail,
                ClientName = clientName,
                UserId = userId
            };

            context.ChatConversations.Add(newConversation);
            context.SaveChanges();

            return _mapper.Map<ChatConversationDto>(newConversation);
        }

        protected ActionResponse SendMessageExecution(int conversationId, SendChatMessageDto dto, string senderName, bool isStudio)
        {
            using var context = new AppDbContext();

            var conversation = context.ChatConversations.FirstOrDefault(c => c.Id == conversationId);

            if (conversation == null)
                return ActionResponse.Fail("Conversation not found.");

            var message = new ChatMessageData
            {
                ConversationId = conversationId,
                Text = dto.Text,
                Sender = isStudio ? ChatSender.Studio : ChatSender.Client,
                SenderName = senderName
            };

            context.ChatMessages.Add(message);

            conversation.LastMessageAt = DateTime.UtcNow;
            context.SaveChanges();

            return ActionResponse.Ok("Message sent successfully.");
        }

        protected ActionResponse MarkAsReadExecution(int conversationId)
        {
            using var context = new AppDbContext();

            var unread = context.ChatMessages
                .Where(m => m.ConversationId == conversationId && !m.IsRead)
                .ToList();

            foreach (var message in unread)
                message.IsRead = true;

            context.SaveChanges();

            return ActionResponse.Ok("Messages marked as read.");
        }
    }
}
