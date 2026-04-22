using System.ComponentModel.DataAnnotations;
using LuminaStudio.Domain.Enums;

namespace LuminaStudio.Domain.Models.PortfolioImage;

public class CreatePortfolioImageDto
{
    [Required]
    [DataType(DataType.Url)]
    [StringLength(500)]
    public string Src { get; set; } = string.Empty;

    [Required]
    [StringLength(250)]
    public string Alt { get; set; } = string.Empty;

    [Required]
    public PortfolioCategory Category { get; set; }

    [Required]
    public PortfolioAspect Aspect { get; set; }

    public int? PhotographerId { get; set; }

    public bool IsPublished { get; set; } = true;

    public int DisplayOrder { get; set; }
}
