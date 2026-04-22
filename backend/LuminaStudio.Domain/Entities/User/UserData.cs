using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using LuminaStudio.Domain.Entities.Booking;
using LuminaStudio.Domain.Entities.Chat;
using LuminaStudio.Domain.Entities.ContactMessage;
using LuminaStudio.Domain.Enums;

namespace LuminaStudio.Domain.Entities.User;

public class UserData
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    [StringLength(60, MinimumLength = 2, ErrorMessage = "Name must be between 2 and 60 characters")]
    public string Name { get; set; } = string.Empty;

    [Required]
    [StringLength(100)]
    [DataType(DataType.EmailAddress)]
    public string Email { get; set; } = string.Empty;

    [StringLength(25)]
    [DataType(DataType.PhoneNumber)]
    public string Phone { get; set; } = string.Empty;

    [Required]
    public string PasswordHash { get; set; } = string.Empty;

    public UserRole Role { get; set; } = UserRole.Client;

    [DataType(DataType.DateTime)]
    public DateTime RegisteredOn { get; set; } = DateTime.UtcNow;

    public DateTime? LastLoginAt { get; set; }

    public bool IsBanned { get; set; }

    [InverseProperty("User")]
    public ICollection<BookingData> Bookings { get; set; } = new List<BookingData>();

    [InverseProperty("User")]
    public ICollection<ChatConversationData> Conversations { get; set; } = new List<ChatConversationData>();

    [InverseProperty("User")]
    public ICollection<ContactMessageData> ContactMessages { get; set; } = new List<ContactMessageData>();
}
