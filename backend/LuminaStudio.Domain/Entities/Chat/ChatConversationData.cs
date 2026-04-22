using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using LuminaStudio.Domain.Entities.User;

namespace LuminaStudio.Domain.Entities.Chat;

public class ChatConversationData
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    [StringLength(100)]
    [DataType(DataType.EmailAddress)]
    public string ClientEmail { get; set; } = string.Empty;

    [Required]
    [StringLength(60)]
    public string ClientName { get; set; } = string.Empty;

    public int? UserId { get; set; }

    [ForeignKey("UserId")]
    public UserData? User { get; set; }

    public bool IsActive { get; set; } = true;

    [DataType(DataType.DateTime)]
    public DateTime? LastMessageAt { get; set; }

    [DataType(DataType.DateTime)]
    public DateTime CreatedOn { get; set; } = DateTime.UtcNow;

    [InverseProperty("Conversation")]
    public ICollection<ChatMessageData> Messages { get; set; } = new List<ChatMessageData>();
}
