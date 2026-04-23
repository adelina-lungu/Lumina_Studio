using LuminaStudio.Domain.Models.Photographer;
using LuminaStudio.Domain.Models.Responses;

namespace LuminaStudio.BusinessLayer.Interfaces
{
    public interface IPhotographerActions
    {
        PhotographerDto? GetById(int id);
        PhotographerDto? GetBySlug(string slug);
        List<PhotographerDto> GetAll();
        ActionResponse Update(int id, UpdatePhotographerDto dto);
        ActionResponse SetAvailability(SetAvailabilityDto dto);
        ActionResponse RemoveAvailability(int photographerId, DateTime date);
    }
}
