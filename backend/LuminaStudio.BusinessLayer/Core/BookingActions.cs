using AutoMapper;
using LuminaStudio.DataAccessLayer.Context;
using LuminaStudio.Domain.Entities.Booking;
using LuminaStudio.Domain.Enums;
using LuminaStudio.Domain.Models.Booking;
using LuminaStudio.Domain.Models.Responses;
using Microsoft.EntityFrameworkCore;

namespace LuminaStudio.BusinessLayer.Core
{
    public class BookingActions
    {
        protected readonly IMapper _mapper;

        protected BookingActions(IMapper mapper)
        {
            _mapper = mapper;
        }

        protected BookingDto? GetByIdExecution(int id)
        {
            using var context = new AppDbContext();

            var booking = context.Bookings
                .Include(b => b.Photographer)
                .Include(b => b.Package)
                .FirstOrDefault(b => b.Id == id);

            if (booking == null)
                return null;

            return _mapper.Map<BookingDto>(booking);
        }

        protected List<BookingDto> GetByUserIdExecution(int userId)
        {
            using var context = new AppDbContext();

            var bookings = context.Bookings
                .Include(b => b.Photographer)
                .Include(b => b.Package)
                .Where(b => b.UserId == userId)
                .OrderByDescending(b => b.CreatedOn)
                .ToList();

            return bookings.Select(b => _mapper.Map<BookingDto>(b)).ToList();
        }

        protected BookingPageDto GetAllExecution(BookingFilterDto filter)
        {
            using var context = new AppDbContext();

            var query = context.Bookings
                .Include(b => b.Photographer)
                .Include(b => b.Package)
                .AsQueryable();

            if (filter.PhotographerId.HasValue)
                query = query.Where(b => b.PhotographerId == filter.PhotographerId.Value);

            if (filter.Status.HasValue)
                query = query.Where(b => b.Status == filter.Status.Value);

            if (filter.DateFrom.HasValue)
            {
                var dateFrom = DateTime.SpecifyKind(filter.DateFrom.Value, DateTimeKind.Utc);
                query = query.Where(b => b.Date >= dateFrom);
            }

            if (filter.DateTo.HasValue)
            {
                var dateTo = DateTime.SpecifyKind(filter.DateTo.Value, DateTimeKind.Utc);
                query = query.Where(b => b.Date <= dateTo);
            }

            if (!string.IsNullOrWhiteSpace(filter.Search))
            {
                var search = filter.Search.ToLower();
                query = query.Where(b =>
                    b.ClientName.ToLower().Contains(search) ||
                    b.ClientEmail.ToLower().Contains(search));
            }

            var totalCount = query.Count();

            query = filter.SortBy?.ToLower() switch
            {
                "date" => filter.SortAscending ? query.OrderBy(b => b.Date) : query.OrderByDescending(b => b.Date),
                "status" => filter.SortAscending ? query.OrderBy(b => b.Status) : query.OrderByDescending(b => b.Status),
                _ => filter.SortAscending ? query.OrderBy(b => b.CreatedOn) : query.OrderByDescending(b => b.CreatedOn)
            };

            var bookings = query
                .Skip((filter.Page - 1) * filter.PageSize)
                .Take(filter.PageSize)
                .ToList();

            return new BookingPageDto
            {
                Items = bookings.Select(b => _mapper.Map<BookingDto>(b)).ToList(),
                TotalCount = totalCount,
                Page = filter.Page,
                PageSize = filter.PageSize
            };
        }

        protected ActionResponse CreateExecution(CreateBookingDto dto, int userId)
        {
            using var context = new AppDbContext();

            dto.Date = DateTime.SpecifyKind(dto.Date, DateTimeKind.Utc);

            var photographer = context.Photographers.FirstOrDefault(p => p.Id == dto.PhotographerId);
            if (photographer == null)
                return ActionResponse.Fail("Photographer not found.");

            var package = context.ServicePackages.FirstOrDefault(sp => sp.Id == dto.PackageId);
            if (package == null)
                return ActionResponse.Fail("Service package not found.");

            var hasConflict = context.PhotographerAvailability
                .Any(a => a.PhotographerId == dto.PhotographerId && a.Date == dto.Date);

            if (hasConflict)
                return ActionResponse.Fail("Photographer is not available on this date.");

            var booking = _mapper.Map<BookingData>(dto);
            booking.UserId = userId;

            context.Bookings.Add(booking);
            context.SaveChanges();

            context.PhotographerAvailability.Add(new Domain.Entities.Photographer.PhotographerAvailabilityData
            {
                PhotographerId = dto.PhotographerId,
                Date = dto.Date,
                Type = AvailabilityType.Booked,
                BookingId = booking.Id
            });
            context.SaveChanges();

            return ActionResponse.Ok("Booking created successfully.");
        }

        protected ActionResponse CancelExecution(int id, int userId)
        {
            using var context = new AppDbContext();

            var booking = context.Bookings.FirstOrDefault(b => b.Id == id);

            if (booking == null)
                return ActionResponse.Fail("Booking not found.");

            if (booking.UserId != userId)
                return ActionResponse.Fail("You can only cancel your own bookings.");

            if (booking.Status == BookingStatus.Cancelled)
                return ActionResponse.Ok("Booking is already cancelled.");

            booking.Status = BookingStatus.Cancelled;

            var availability = context.PhotographerAvailability
                .FirstOrDefault(a => a.BookingId == id);

            if (availability != null)
                context.PhotographerAvailability.Remove(availability);

            context.SaveChanges();

            return ActionResponse.Ok("Booking cancelled successfully.");
        }

        protected ActionResponse ConfirmExecution(int id)
        {
            using var context = new AppDbContext();

            var booking = context.Bookings.FirstOrDefault(b => b.Id == id);

            if (booking == null)
                return ActionResponse.Fail("Booking not found.");

            if (booking.Status != BookingStatus.Pending)
                return ActionResponse.Fail("Only pending bookings can be confirmed.");

            booking.Status = BookingStatus.Confirmed;
            context.SaveChanges();

            return ActionResponse.Ok("Booking confirmed successfully.");
        }

        protected ActionResponse CompleteExecution(int id)
        {
            using var context = new AppDbContext();

            var booking = context.Bookings.FirstOrDefault(b => b.Id == id);

            if (booking == null)
                return ActionResponse.Fail("Booking not found.");

            if (booking.Status != BookingStatus.Confirmed)
                return ActionResponse.Fail("Only confirmed bookings can be completed.");

            booking.Status = BookingStatus.Completed;
            context.SaveChanges();

            return ActionResponse.Ok("Booking completed successfully.");
        }
    }
}
