using System.ComponentModel.DataAnnotations;

namespace LuminaStudio.Domain.Models.Testimonial;

public class CreateTestimonialDto
{
    [Required]
    [StringLength(100, MinimumLength = 2)]
    public string Name { get; set; } = string.Empty;

    [StringLength(120)]
    public string Role { get; set; } = string.Empty;

    [DataType(DataType.Url)]
    [StringLength(500)]
    public string AvatarUrl { get; set; } = string.Empty;

    [Required]
    [StringLength(1000, MinimumLength = 10)]
    public string Text { get; set; } = string.Empty;

    [Range(1, 5)]
    public int Rating { get; set; } = 5;
}
