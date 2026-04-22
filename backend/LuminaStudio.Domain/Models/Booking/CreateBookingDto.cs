using System.ComponentModel.DataAnnotations;

namespace LuminaStudio.Domain.Models.Booking;

public class CreateBookingDto
{
    [Required]
    public int PhotographerId { get; set; }

    [Required]
    public int PackageId { get; set; }

    [Required]
    [DataType(DataType.Date)]
    public DateTime Date { get; set; }

    [Range(1, 50)]
    public int PeopleCount { get; set; } = 1;

    [Required]
    [StringLength(60, MinimumLength = 2)]
    public string ClientName { get; set; } = string.Empty;

    [Required]
    [StringLength(100)]
    [DataType(DataType.EmailAddress)]
    public string ClientEmail { get; set; } = string.Empty;
}
