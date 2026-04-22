using LuminaStudio.Domain.Enums;

namespace LuminaStudio.Domain.Models.Booking;

public class BookingDto
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public int PhotographerId { get; set; }

    public string PhotographerName { get; set; } = string.Empty;

    public int PackageId { get; set; }

    public string PackageName { get; set; } = string.Empty;

    public DateTime Date { get; set; }

    public int PeopleCount { get; set; }

    public string ClientName { get; set; } = string.Empty;

    public string ClientEmail { get; set; } = string.Empty;

    public BookingStatus Status { get; set; }

    public DateTime CreatedOn { get; set; }
}
