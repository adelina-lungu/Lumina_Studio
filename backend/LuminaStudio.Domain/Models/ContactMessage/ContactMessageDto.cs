namespace LuminaStudio.Domain.Models.ContactMessage;

public class ContactMessageDto
{
    public int Id { get; set; }

    public int? UserId { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string Phone { get; set; } = string.Empty;

    public string Subject { get; set; } = string.Empty;

    public string Message { get; set; } = string.Empty;

    public bool IsRead { get; set; }

    public bool IsResolved { get; set; }

    public DateTime CreatedOn { get; set; }
}
