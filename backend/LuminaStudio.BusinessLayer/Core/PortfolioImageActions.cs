using AutoMapper;
using LuminaStudio.DataAccessLayer.Context;
using LuminaStudio.Domain.Entities.PortfolioImage;
using LuminaStudio.Domain.Enums;
using LuminaStudio.Domain.Models.PortfolioImage;
using LuminaStudio.Domain.Models.Responses;

namespace LuminaStudio.BusinessLayer.Core
{
    public class PortfolioImageActions
    {
        protected readonly IMapper _mapper;

        protected PortfolioImageActions(IMapper mapper)
        {
            _mapper = mapper;
        }

        protected PortfolioImageDto? GetByIdExecution(int id)
        {
            using var context = new AppDbContext();

            var image = context.PortfolioImages.FirstOrDefault(i => i.Id == id);

            if (image == null)
                return null;

            return _mapper.Map<PortfolioImageDto>(image);
        }

        protected List<PortfolioImageDto> GetAllExecution(PortfolioCategory? category = null)
        {
            using var context = new AppDbContext();

            var query = context.PortfolioImages
                .Where(i => i.IsPublished)
                .AsQueryable();

            if (category.HasValue)
                query = query.Where(i => i.Category == category.Value);

            var images = query
                .OrderBy(i => i.DisplayOrder)
                .ToList();

            return images.Select(i => _mapper.Map<PortfolioImageDto>(i)).ToList();
        }

        protected ActionResponse CreateExecution(CreatePortfolioImageDto dto)
        {
            using var context = new AppDbContext();

            if (dto.PhotographerId.HasValue)
            {
                var photographer = context.Photographers.FirstOrDefault(p => p.Id == dto.PhotographerId.Value);
                if (photographer == null)
                    return ActionResponse.Fail("Photographer not found.");
            }

            var image = _mapper.Map<PortfolioImageData>(dto);

            context.PortfolioImages.Add(image);
            context.SaveChanges();

            return ActionResponse.Ok("Portfolio image created successfully.");
        }

        protected ActionResponse DeleteExecution(int id)
        {
            using var context = new AppDbContext();

            var image = context.PortfolioImages.FirstOrDefault(i => i.Id == id);

            if (image == null)
                return ActionResponse.Fail("Portfolio image not found.");

            context.PortfolioImages.Remove(image);
            context.SaveChanges();

            return ActionResponse.Ok("Portfolio image deleted successfully.");
        }
    }
}
