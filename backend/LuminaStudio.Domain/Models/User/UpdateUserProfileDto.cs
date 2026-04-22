using System.ComponentModel.DataAnnotations;

namespace LuminaStudio.Domain.Models.User;

public class UpdateUserProfileDto
{
    [Required]
    [StringLength(60, MinimumLength = 2)]
    public string Name { get; set; } = string.Empty;

    [StringLength(25)]
    [DataType(DataType.PhoneNumber)]
    public string Phone { get; set; } = string.Empty;
}
