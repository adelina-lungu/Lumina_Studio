using LuminaStudio.Domain.Enums;

namespace LuminaStudio.Domain.Models.User;

public class UserDto
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string Phone { get; set; } = string.Empty;

    public UserRole Role { get; set; }

    public DateTime RegisteredOn { get; set; }

    public DateTime? LastLoginAt { get; set; }

    public bool IsBanned { get; set; }
}
