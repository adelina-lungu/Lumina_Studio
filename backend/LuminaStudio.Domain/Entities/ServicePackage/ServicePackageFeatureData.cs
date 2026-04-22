using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LuminaStudio.Domain.Entities.ServicePackage;

public class ServicePackageFeatureData
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    public int PackageId { get; set; }

    [ForeignKey("PackageId")]
    public ServicePackageData Package { get; set; } = null!;

    [Required]
    [StringLength(200)]
    public string Text { get; set; } = string.Empty;

    public int DisplayOrder { get; set; }
}
