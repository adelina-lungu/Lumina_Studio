using System.ComponentModel.DataAnnotations;
using LuminaStudio.Domain.Enums;

namespace LuminaStudio.Domain.Models.ServicePackage;

public class CreateServicePackageDto
{
    [Required]
    public PackageTier Tier { get; set; }

    [Required]
    [StringLength(60)]
    public string Name { get; set; } = string.Empty;

    [Range(0, 100000)]
    public decimal Price { get; set; }

    [Required]
    [StringLength(5)]
    public string Currency { get; set; } = "€";

    public bool IsHighlighted { get; set; }

    public int DisplayOrder { get; set; }

    public List<string> Features { get; set; } = new();
}
