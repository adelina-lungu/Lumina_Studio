using AutoMapper;
using LuminaStudio.BusinessLayer.Core;
using LuminaStudio.BusinessLayer.Interfaces;
using LuminaStudio.Domain.Models.Responses;
using LuminaStudio.Domain.Models.Testimonial;

namespace LuminaStudio.BusinessLayer.Structure;

public class TestimonialExecution : TestimonialActions, ITestimonialActions
{
    public TestimonialExecution(IMapper mapper) : base(mapper) {}

    public List<TestimonialDto> GetAll(bool approvedOnly = false)
    {
        return GetAllExecution(approvedOnly);
    }

    public ActionResponse Create(CreateTestimonialDto dto)
    {
        return ActionResponse.SafeExecute(() => CreateExecution(dto));
    }

    public ActionResponse Approve(int id)
    {
        return ActionResponse.SafeExecute(() => ApproveExecution(id));
    }

    public ActionResponse Delete(int id)
    {
        return ActionResponse.SafeExecute(() => DeleteExecution(id));
    }
}
