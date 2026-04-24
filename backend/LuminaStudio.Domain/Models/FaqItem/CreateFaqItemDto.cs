using System.ComponentModel.DataAnnotations;

namespace LuminaStudio.Domain.Models.FaqItem;

public class CreateFaqItemDto
{
    [Required]
    [StringLength(250, MinimumLength = 5)]
    public string Question { get; set; } = string.Empty;

    [Required]
    [StringLength(2000, MinimumLength = 5)]
    public string Answer { get; set; } = string.Empty;

    public int DisplayOrder { get; set; }
}
