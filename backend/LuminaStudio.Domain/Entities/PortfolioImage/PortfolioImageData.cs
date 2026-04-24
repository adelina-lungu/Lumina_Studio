using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using LuminaStudio.Domain.Entities.Photographer;
using LuminaStudio.Domain.Enums;

namespace LuminaStudio.Domain.Entities.PortfolioImage;

public class PortfolioImageData
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

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

    [ForeignKey("PhotographerId")]
    public PhotographerData? Photographer { get; set; }

    public bool IsPublished { get; set; } = true;

    public int DisplayOrder { get; set; }

    [DataType(DataType.DateTime)]
    public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
}
