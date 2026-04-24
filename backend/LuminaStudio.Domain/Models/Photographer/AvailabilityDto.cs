using LuminaStudio.Domain.Enums;

namespace LuminaStudio.Domain.Models.Photographer;

public class AvailabilityDto
{
    public int Id { get; set; }

    public int PhotographerId { get; set; }

    public DateTime Date { get; set; }

    public AvailabilityType Type { get; set; }

    public int? BookingId { get; set; }
}
