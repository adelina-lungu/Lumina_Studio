namespace LuminaStudio.Domain.Models.Chat;

public class ChatConversationDto
{
    public int Id { get; set; }

    public string ClientEmail { get; set; } = string.Empty;

    public string ClientName { get; set; } = string.Empty;

    public int? UserId { get; set; }

    public bool IsActive { get; set; }

    public DateTime? LastMessageAt { get; set; }

    public DateTime CreatedOn { get; set; }

    public int UnreadCount { get; set; }

    public List<ChatMessageDto> Messages { get; set; } = new();
}
