using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using LuminaStudio.Domain.Enums;

namespace LuminaStudio.Domain.Entities.Chat;

public class ChatMessageData
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    public int ConversationId { get; set; }

    [ForeignKey("ConversationId")]
    public ChatConversationData Conversation { get; set; } = null!;

    [Required]
    [StringLength(2000, MinimumLength = 1)]
    public string Text { get; set; } = string.Empty;

    [Required]
    public ChatSender Sender { get; set; }

    [StringLength(60)]
    public string SenderName { get; set; } = string.Empty;

    public bool IsRead { get; set; }

    [DataType(DataType.DateTime)]
    public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
}
