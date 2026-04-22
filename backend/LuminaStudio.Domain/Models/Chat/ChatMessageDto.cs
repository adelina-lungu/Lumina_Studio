using LuminaStudio.Domain.Enums;

namespace LuminaStudio.Domain.Models.Chat;

public class ChatMessageDto
{
    public int Id { get; set; }

    public int ConversationId { get; set; }

    public string Text { get; set; } = string.Empty;

    public ChatSender Sender { get; set; }

    public string SenderName { get; set; } = string.Empty;

    public bool IsRead { get; set; }

    public DateTime CreatedOn { get; set; }
}
