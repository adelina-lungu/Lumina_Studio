namespace LuminaStudio.Domain.Models.Booking;

public class BookingPageDto
{
    public List<BookingDto> Items { get; set; } = new();

    public int TotalCount { get; set; }

    public int Page { get; set; }

    public int PageSize { get; set; }
}
