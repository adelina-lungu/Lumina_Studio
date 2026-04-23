using AutoMapper;
using LuminaStudio.DataAccessLayer.Context;
using LuminaStudio.Domain.Entities.FaqItem;
using LuminaStudio.Domain.Models.FaqItem;
using LuminaStudio.Domain.Models.Responses;

namespace LuminaStudio.BusinessLayer.Core
{
    public class FaqItemActions
    {
        protected readonly IMapper _mapper;

        protected FaqItemActions(IMapper mapper)
        {
            _mapper = mapper;
        }

        protected List<FaqItemDto> GetAllExecution(bool activeOnly = false)
        {
            using var context = new AppDbContext();

            var query = context.FaqItems.AsQueryable();

            if (activeOnly)
                query = query.Where(f => f.IsActive);

            var items = query
                .OrderBy(f => f.DisplayOrder)
                .ToList();

            return items.Select(f => _mapper.Map<FaqItemDto>(f)).ToList();
        }

        protected ActionResponse CreateExecution(CreateFaqItemDto dto)
        {
            using var context = new AppDbContext();

            var faq = _mapper.Map<FaqItemData>(dto);

            context.FaqItems.Add(faq);
            context.SaveChanges();

            return ActionResponse.Ok("FAQ item created successfully.");
        }

        protected ActionResponse UpdateExecution(int id, UpdateFaqItemDto dto)
        {
            using var context = new AppDbContext();

            var faq = context.FaqItems.FirstOrDefault(f => f.Id == id);

            if (faq == null)
                return ActionResponse.Fail("FAQ item not found.");

            faq.Question = dto.Question;
            faq.Answer = dto.Answer;
            faq.DisplayOrder = dto.DisplayOrder;
            faq.IsActive = dto.IsActive;

            context.SaveChanges();

            return ActionResponse.Ok("FAQ item updated successfully.");
        }

        protected ActionResponse DeleteExecution(int id)
        {
            using var context = new AppDbContext();

            var faq = context.FaqItems.FirstOrDefault(f => f.Id == id);

            if (faq == null)
                return ActionResponse.Fail("FAQ item not found.");

            context.FaqItems.Remove(faq);
            context.SaveChanges();

            return ActionResponse.Ok("FAQ item deleted successfully.");
        }
    }
}
