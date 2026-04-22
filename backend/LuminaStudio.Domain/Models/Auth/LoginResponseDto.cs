using LuminaStudio.Domain.Models.User;

namespace LuminaStudio.Domain.Models.Auth;

public class LoginResponseDto
{
    public UserDto User { get; set; } = null!;

    public string Token { get; set; } = string.Empty;

    public DateTime ExpiresAt { get; set; }
}
