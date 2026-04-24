using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using LuminaStudio.Domain.Entities.Photographer;
using LuminaStudio.Domain.Entities.ServicePackage;
using LuminaStudio.Domain.Entities.User;
using LuminaStudio.Domain.Enums;

namespace LuminaStudio.Domain.Entities.Booking;

public class BookingData
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    public int UserId { get; set; }

    [ForeignKey("UserId")]
    public UserData User { get; set; } = null!;

    [Required]
    public int PhotographerId { get; set; }

    [ForeignKey("PhotographerId")]
    public PhotographerData Photographer { get; set; } = null!;

    [Required]
    public int PackageId { get; set; }

    [ForeignKey("PackageId")]
    public ServicePackageData Package { get; set; } = null!;

    [Required]
    [DataType(DataType.Date)]
    public DateTime Date { get; set; }

    [Range(1, 50, ErrorMessage = "People count must be between 1 and 50")]
    public int PeopleCount { get; set; } = 1;

    [Required]
    [StringLength(60)]
    public string ClientName { get; set; } = string.Empty;

    [Required]
    [StringLength(100)]
    [DataType(DataType.EmailAddress)]
    public string ClientEmail { get; set; } = string.Empty;

    [Required]
    public BookingStatus Status { get; set; } = BookingStatus.Pending;

    [DataType(DataType.DateTime)]
    public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
}
