using AutoMapper;
using LuminaStudio.DataAccessLayer.Context;
using LuminaStudio.Domain.Entities.Photographer;
using LuminaStudio.Domain.Models.Photographer;
using LuminaStudio.Domain.Models.Responses;
using Microsoft.EntityFrameworkCore;

namespace LuminaStudio.BusinessLayer.Core
{
    public class PhotographerActions
    {
        protected readonly IMapper _mapper;

        protected PhotographerActions(IMapper mapper)
        {
            _mapper = mapper;
        }

        private PhotographerDto MapWithBusyDates(PhotographerData photographer)
        {
            var dto = _mapper.Map<PhotographerDto>(photographer);
            dto.BusyDates = photographer.Availability
                .Select(a => a.Date.ToString("yyyy-MM-dd"))
                .ToList();
            return dto;
        }

        protected PhotographerDto? GetByIdExecution(int id)
        {
            using var context = new AppDbContext();

            var photographer = context.Photographers
                .Include(p => p.Availability)
                .FirstOrDefault(p => p.Id == id);

            if (photographer == null)
                return null;

            return MapWithBusyDates(photographer);
        }

        protected PhotographerDto? GetBySlugExecution(string slug)
        {
            using var context = new AppDbContext();

            var photographer = context.Photographers
                .Include(p => p.Availability)
                .FirstOrDefault(p => p.Slug == slug);

            if (photographer == null)
                return null;

            return MapWithBusyDates(photographer);
        }

        protected List<PhotographerDto> GetAllExecution()
        {
            using var context = new AppDbContext();

            var photographers = context.Photographers
                .Include(p => p.Availability)
                .Where(p => p.IsActive)
                .OrderBy(p => p.DisplayOrder)
                .ToList();

            return photographers.Select(MapWithBusyDates).ToList();
        }

        protected ActionResponse UpdateExecution(int id, UpdatePhotographerDto dto)
        {
            using var context = new AppDbContext();

            var photographer = context.Photographers.FirstOrDefault(p => p.Id == id);

            if (photographer == null)
                return ActionResponse.Fail("Photographer not found.");

            photographer.Name = dto.Name;
            photographer.Specialty = dto.Specialty;
            photographer.Bio = dto.Bio;
            photographer.AvatarUrl = dto.AvatarUrl;
            photographer.CoverUrl = dto.CoverUrl;
            photographer.InstagramUrl = dto.InstagramUrl;
            photographer.FacebookUrl = dto.FacebookUrl;
            photographer.WebsiteUrl = dto.WebsiteUrl;
            photographer.IsActive = dto.IsActive;
            photographer.DisplayOrder = dto.DisplayOrder;

            context.SaveChanges();

            return ActionResponse.Ok("Photographer updated successfully.");
        }

        protected ActionResponse SetAvailabilityExecution(SetAvailabilityDto dto)
        {
            using var context = new AppDbContext();

            var photographer = context.Photographers.FirstOrDefault(p => p.Id == dto.PhotographerId);
            if (photographer == null)
                return ActionResponse.Fail("Photographer not found.");

            var existing = context.PhotographerAvailability
                .FirstOrDefault(a => a.PhotographerId == dto.PhotographerId && a.Date == dto.Date);

            if (existing != null)
                return ActionResponse.Fail("This date is already marked.");

            context.PhotographerAvailability.Add(new PhotographerAvailabilityData
            {
                PhotographerId = dto.PhotographerId,
                Date = dto.Date,
                Type = dto.Type
            });
            context.SaveChanges();

            return ActionResponse.Ok("Availability set successfully.");
        }

        protected ActionResponse RemoveAvailabilityExecution(int photographerId, DateTime date)
        {
            using var context = new AppDbContext();

            var availability = context.PhotographerAvailability
                .FirstOrDefault(a => a.PhotographerId == photographerId && a.Date == date && a.BookingId == null);

            if (availability == null)
                return ActionResponse.Fail("Availability entry not found or is linked to a booking.");

            context.PhotographerAvailability.Remove(availability);
            context.SaveChanges();

            return ActionResponse.Ok("Availability removed successfully.");
        }
    }
}
