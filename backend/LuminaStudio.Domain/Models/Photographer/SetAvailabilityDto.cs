using System.ComponentModel.DataAnnotations;
using LuminaStudio.Domain.Enums;

namespace LuminaStudio.Domain.Models.Photographer;

public class SetAvailabilityDto
{
    [Required]
    public int PhotographerId { get; set; }

    [Required]
    [DataType(DataType.Date)]
    public DateTime Date { get; set; }

    [Required]
    public AvailabilityType Type { get; set; } = AvailabilityType.Busy;
}
