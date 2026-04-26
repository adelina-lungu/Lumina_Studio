using AutoMapper;
using LuminaStudio.BusinessLayer.Core;
using LuminaStudio.BusinessLayer.Interfaces;
using LuminaStudio.Domain.Models.FaqItem;
using LuminaStudio.Domain.Models.Responses;

namespace LuminaStudio.BusinessLayer.Structure;

public class FaqItemExecution : FaqItemActions, IFaqItemActions
{
    public FaqItemExecution(IMapper mapper) : base(mapper) {}

    public List<FaqItemDto> GetAll(bool activeOnly = false)
    {
        return GetAllExecution(activeOnly);
    }

    public ActionResponse Create(CreateFaqItemDto dto)
    {
        return ActionResponse.SafeExecute(() => CreateExecution(dto));
    }

    public ActionResponse Update(int id, UpdateFaqItemDto dto)
    {
        return ActionResponse.SafeExecute(() => UpdateExecution(id, dto));
    }

    public ActionResponse Delete(int id)
    {
        return ActionResponse.SafeExecute(() => DeleteExecution(id));
    }
}
