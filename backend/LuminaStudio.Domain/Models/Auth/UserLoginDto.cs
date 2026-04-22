using System.ComponentModel.DataAnnotations;

namespace LuminaStudio.Domain.Models.Auth;

public class UserLoginDto
{
    [Required]
    [DataType(DataType.EmailAddress)]
    [StringLength(100)]
    public string Email { get; set; } = string.Empty;

    [Required]
    [DataType(DataType.Password)]
    [StringLength(100, MinimumLength = 6)]
    public string Password { get; set; } = string.Empty;
}
