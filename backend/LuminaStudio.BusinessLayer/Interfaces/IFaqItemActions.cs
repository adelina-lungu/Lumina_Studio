using LuminaStudio.Domain.Models.FaqItem;
using LuminaStudio.Domain.Models.Responses;

namespace LuminaStudio.BusinessLayer.Interfaces
{
    public interface IFaqItemActions
    {
        List<FaqItemDto> GetAll(bool activeOnly = false);
        ActionResponse Create(CreateFaqItemDto dto);
        ActionResponse Update(int id, UpdateFaqItemDto dto);
        ActionResponse Delete(int id);
    }
}
