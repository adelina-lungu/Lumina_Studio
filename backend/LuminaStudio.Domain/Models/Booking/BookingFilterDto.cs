using System.ComponentModel.DataAnnotations;
using LuminaStudio.Domain.Enums;

namespace LuminaStudio.Domain.Models.Booking;

public class BookingFilterDto
{
    public int? PhotographerId { get; set; }

    public BookingStatus? Status { get; set; }

    public DateTime? DateFrom { get; set; }

    public DateTime? DateTo { get; set; }

    [StringLength(100)]
    public string? Search { get; set; }

    public string SortBy { get; set; } = "timestamp";

    public bool SortAscending { get; set; }

    [Range(1, int.MaxValue)]
    public int Page { get; set; } = 1;

    [Range(1, 100)]
    public int PageSize { get; set; } = 20;
}
