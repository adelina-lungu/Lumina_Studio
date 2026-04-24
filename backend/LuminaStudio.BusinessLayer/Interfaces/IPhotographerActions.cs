using LuminaStudio.Domain.Models.Photographer;
using LuminaStudio.Domain.Models.Responses;

namespace LuminaStudio.BusinessLayer.Interfaces
{
    public interface IPhotographerActions
    {
        PhotographerDto? GetById(int id);
        PhotographerDto? GetBySlug(string slug);
        List<PhotographerDto> GetAll();
        List<PhotographerDto> GetAllAdmin();
        ActionResponse Create(CreatePhotographerDto dto);
        ActionResponse Update(int id, UpdatePhotographerDto dto);
        ActionResponse Delete(int id);
        ActionResponse SetAvailability(SetAvailabilityDto dto);
        ActionResponse RemoveAvailability(int photographerId, DateTime date);
    }
}
