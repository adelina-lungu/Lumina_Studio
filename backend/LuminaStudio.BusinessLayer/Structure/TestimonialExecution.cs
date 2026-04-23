using AutoMapper;
using LuminaStudio.BusinessLayer.Interfaces;
using LuminaStudio.Domain.Models.Responses;
using LuminaStudio.Domain.Models.Testimonial;

namespace LuminaStudio.BusinessLayer.Structure;

public class TestimonialExecution : ITestimonialActions
{
    private readonly IMapper _mapper;

    public TestimonialExecution(IMapper mapper)
    {
        _mapper = mapper;
    }

    public List<TestimonialDto> GetAll(bool approvedOnly = false) => throw new NotImplementedException();
    public ActionResponse Create(CreateTestimonialDto dto) => throw new NotImplementedException();
    public ActionResponse Approve(int id) => throw new NotImplementedException();
    public ActionResponse Delete(int id) => throw new NotImplementedException();
}
