using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using LuminaStudio.Domain.Entities.Booking;
using LuminaStudio.Domain.Enums;

namespace LuminaStudio.Domain.Entities.ServicePackage;

public class ServicePackageData
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    [StringLength(30, MinimumLength = 2, ErrorMessage = "Slug must be between 2 and 30 characters")]
    public string Slug { get; set; } = string.Empty;

    [Required]
    public PackageTier Tier { get; set; }

    [Required]
    [StringLength(60)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [Column(TypeName = "numeric(10,2)")]
    public decimal Price { get; set; }

    [Required]
    [StringLength(5)]
    public string Currency { get; set; } = "€";

    public bool IsHighlighted { get; set; }

    public bool IsActive { get; set; } = true;

    public int DisplayOrder { get; set; }

    [DataType(DataType.DateTime)]
    public DateTime CreatedOn { get; set; } = DateTime.UtcNow;

    [InverseProperty("Package")]
    public ICollection<ServicePackageFeatureData> Features { get; set; } = new List<ServicePackageFeatureData>();

    [InverseProperty("Package")]
    public ICollection<BookingData> Bookings { get; set; } = new List<BookingData>();
}
