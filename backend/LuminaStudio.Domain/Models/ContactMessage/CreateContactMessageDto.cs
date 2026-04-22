using System.ComponentModel.DataAnnotations;

namespace LuminaStudio.Domain.Models.ContactMessage;

public class CreateContactMessageDto
{
    [Required]
    [StringLength(100, MinimumLength = 2)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [DataType(DataType.EmailAddress)]
    [StringLength(100)]
    public string Email { get; set; } = string.Empty;

    [StringLength(25)]
    [DataType(DataType.PhoneNumber)]
    public string Phone { get; set; } = string.Empty;

    [StringLength(200)]
    public string Subject { get; set; } = string.Empty;

    [Required]
    [StringLength(2000, MinimumLength = 5)]
    public string Message { get; set; } = string.Empty;
}
