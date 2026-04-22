using LuminaStudio.Domain.Enums;

namespace LuminaStudio.Domain.Models.ServicePackage;

public class ServicePackageDto
{
    public int Id { get; set; }

    public string Slug { get; set; } = string.Empty;

    public PackageTier Tier { get; set; }

    public string Name { get; set; } = string.Empty;

    public decimal Price { get; set; }

    public string Currency { get; set; } = "€";

    public bool IsHighlighted { get; set; }

    public bool IsActive { get; set; }

    public int DisplayOrder { get; set; }

    public List<string> Features { get; set; } = new();
}
