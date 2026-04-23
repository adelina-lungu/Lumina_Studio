using LuminaStudio.Domain.Models.Responses;
using LuminaStudio.Domain.Models.Testimonial;

namespace LuminaStudio.BusinessLayer.Interfaces
{
    public interface ITestimonialActions
    {
        List<TestimonialDto> GetAll(bool approvedOnly = false);
        ActionResponse Create(CreateTestimonialDto dto);
        ActionResponse Approve(int id);
        ActionResponse Delete(int id);
    }
}
