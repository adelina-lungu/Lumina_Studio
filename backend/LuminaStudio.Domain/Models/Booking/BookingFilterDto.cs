using LuminaStudio.Domain.Enums;

namespace LuminaStudio.Domain.Models.Booking;

public class BookingFilterDto
{
    public int? PhotographerId { get; set; }

    public BookingStatus? Status { get; set; }

    public DateTime? DateFrom { get; set; }

    public DateTime? DateTo { get; set; }

    public string? Search { get; set; }

    public string SortBy { get; set; } = "timestamp";

    public bool SortAscending { get; set; }

    public int Page { get; set; } = 1;

    public int PageSize { get; set; } = 20;
}
