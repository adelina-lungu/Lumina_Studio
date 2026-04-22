using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using LuminaStudio.Domain.Entities.Booking;
using LuminaStudio.Domain.Enums;

namespace LuminaStudio.Domain.Entities.Photographer;

public class PhotographerAvailabilityData
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    public int PhotographerId { get; set; }

    [ForeignKey("PhotographerId")]
    public PhotographerData Photographer { get; set; } = null!;

    [Required]
    [DataType(DataType.Date)]
    public DateTime Date { get; set; }

    [Required]
    public AvailabilityType Type { get; set; } = AvailabilityType.Busy;

    public int? BookingId { get; set; }

    [ForeignKey("BookingId")]
    public BookingData? Booking { get; set; }

    [DataType(DataType.DateTime)]
    public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
}
