using System.ComponentModel.DataAnnotations;

namespace LuminaStudio.Domain.Models.Auth;

public class UserRegisterDto
{
    [Required]
    [StringLength(60, MinimumLength = 2)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [DataType(DataType.EmailAddress)]
    [StringLength(100)]
    public string Email { get; set; } = string.Empty;

    [StringLength(25)]
    [DataType(DataType.PhoneNumber)]
    public string Phone { get; set; } = string.Empty;

    [Required]
    [DataType(DataType.Password)]
    [StringLength(100, MinimumLength = 6)]
    public string Password { get; set; } = string.Empty;
}
