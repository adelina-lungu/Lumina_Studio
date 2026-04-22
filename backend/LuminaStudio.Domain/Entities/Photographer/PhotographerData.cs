using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using LuminaStudio.Domain.Entities.Booking;
using LuminaStudio.Domain.Entities.PortfolioImage;

namespace LuminaStudio.Domain.Entities.Photographer;

public class PhotographerData
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    [StringLength(40, MinimumLength = 2, ErrorMessage = "Slug must be between 2 and 40 characters")]
    public string Slug { get; set; } = string.Empty;

    [Required]
    [StringLength(80)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [StringLength(120)]
    public string Specialty { get; set; } = string.Empty;

    [StringLength(1500)]
    public string Bio { get; set; } = string.Empty;

    [Required]
    [DataType(DataType.Url)]
    [StringLength(500)]
    public string AvatarUrl { get; set; } = string.Empty;

    [DataType(DataType.Url)]
    [StringLength(500)]
    public string CoverUrl { get; set; } = string.Empty;

    [DataType(DataType.Url)]
    [StringLength(250)]
    public string? InstagramUrl { get; set; }

    [DataType(DataType.Url)]
    [StringLength(250)]
    public string? FacebookUrl { get; set; }

    [DataType(DataType.Url)]
    [StringLength(250)]
    public string? WebsiteUrl { get; set; }

    public bool IsActive { get; set; } = true;

    public int DisplayOrder { get; set; }

    [DataType(DataType.DateTime)]
    public DateTime CreatedOn { get; set; } = DateTime.UtcNow;

    [InverseProperty("Photographer")]
    public ICollection<BookingData> Bookings { get; set; } = new List<BookingData>();

    [InverseProperty("Photographer")]
    public ICollection<PhotographerAvailabilityData> Availability { get; set; } = new List<PhotographerAvailabilityData>();

    [InverseProperty("Photographer")]
    public ICollection<PortfolioImageData> PortfolioImages { get; set; } = new List<PortfolioImageData>();
}
