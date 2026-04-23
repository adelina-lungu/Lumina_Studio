using AutoMapper;
using LuminaStudio.BusinessLayer.Interfaces;
using LuminaStudio.Domain.Models.FaqItem;
using LuminaStudio.Domain.Models.Responses;

namespace LuminaStudio.BusinessLayer.Structure;

public class FaqItemExecution : IFaqItemActions
{
    private readonly IMapper _mapper;

    public FaqItemExecution(IMapper mapper)
    {
        _mapper = mapper;
    }

    public List<FaqItemDto> GetAll(bool activeOnly = false) => throw new NotImplementedException();
    public ActionResponse Create(CreateFaqItemDto dto) => throw new NotImplementedException();
    public ActionResponse Update(int id, UpdateFaqItemDto dto) => throw new NotImplementedException();
    public ActionResponse Delete(int id) => throw new NotImplementedException();
}
