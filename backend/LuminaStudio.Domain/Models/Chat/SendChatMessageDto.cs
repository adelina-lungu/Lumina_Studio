using System.ComponentModel.DataAnnotations;

namespace LuminaStudio.Domain.Models.Chat;

public class SendChatMessageDto
{
    [Required]
    [StringLength(2000, MinimumLength = 1)]
    public string Text { get; set; } = string.Empty;
}
