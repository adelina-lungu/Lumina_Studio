using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using LuminaStudio.Domain.Entities.User;

namespace LuminaStudio.Domain.Entities.ContactMessage;

public class ContactMessageData
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    public int? UserId { get; set; }

    [ForeignKey("UserId")]
    public UserData? User { get; set; }

    [Required]
    [StringLength(100, MinimumLength = 2)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [StringLength(100)]
    [DataType(DataType.EmailAddress)]
    public string Email { get; set; } = string.Empty;

    [StringLength(25)]
    [DataType(DataType.PhoneNumber)]
    public string Phone { get; set; } = string.Empty;

    [StringLength(200)]
    public string Subject { get; set; } = string.Empty;

    [Required]
    [StringLength(2000, MinimumLength = 5)]
    public string Message { get; set; } = string.Empty;

    public bool IsRead { get; set; }

    public bool IsResolved { get; set; }

    [DataType(DataType.DateTime)]
    public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
}
