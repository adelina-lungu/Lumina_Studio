using LuminaStudio.Domain.Enums;

namespace LuminaStudio.Domain.Models.PortfolioImage;

public class PortfolioImageDto
{
    public int Id { get; set; }

    public string Src { get; set; } = string.Empty;

    public string Alt { get; set; } = string.Empty;

    public PortfolioCategory Category { get; set; }

    public PortfolioAspect Aspect { get; set; }

    public int? PhotographerId { get; set; }

    public bool IsPublished { get; set; }

    public int DisplayOrder { get; set; }
}
