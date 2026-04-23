using AutoMapper;
using LuminaStudio.DataAccessLayer.Context;
using LuminaStudio.Domain.Entities.Testimonial;
using LuminaStudio.Domain.Models.Responses;
using LuminaStudio.Domain.Models.Testimonial;

namespace LuminaStudio.BusinessLayer.Core
{
    public class TestimonialActions
    {
        protected readonly IMapper _mapper;

        protected TestimonialActions(IMapper mapper)
        {
            _mapper = mapper;
        }

        protected List<TestimonialDto> GetAllExecution(bool approvedOnly = false)
        {
            using var context = new AppDbContext();

            var query = context.Testimonials.AsQueryable();

            if (approvedOnly)
                query = query.Where(t => t.IsApproved);

            var testimonials = query
                .OrderByDescending(t => t.CreatedOn)
                .ToList();

            return testimonials.Select(t => _mapper.Map<TestimonialDto>(t)).ToList();
        }

        protected ActionResponse CreateExecution(CreateTestimonialDto dto)
        {
            using var context = new AppDbContext();

            var testimonial = _mapper.Map<TestimonialData>(dto);

            context.Testimonials.Add(testimonial);
            context.SaveChanges();

            return ActionResponse.Ok("Testimonial submitted successfully.");
        }

        protected ActionResponse ApproveExecution(int id)
        {
            using var context = new AppDbContext();

            var testimonial = context.Testimonials.FirstOrDefault(t => t.Id == id);

            if (testimonial == null)
                return ActionResponse.Fail("Testimonial not found.");

            testimonial.IsApproved = true;
            context.SaveChanges();

            return ActionResponse.Ok("Testimonial approved successfully.");
        }

        protected ActionResponse DeleteExecution(int id)
        {
            using var context = new AppDbContext();

            var testimonial = context.Testimonials.FirstOrDefault(t => t.Id == id);

            if (testimonial == null)
                return ActionResponse.Fail("Testimonial not found.");

            context.Testimonials.Remove(testimonial);
            context.SaveChanges();

            return ActionResponse.Ok("Testimonial deleted successfully.");
        }
    }
}
