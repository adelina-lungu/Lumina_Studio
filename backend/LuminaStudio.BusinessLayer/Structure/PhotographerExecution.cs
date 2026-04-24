using AutoMapper;
using LuminaStudio.BusinessLayer.Core;
using LuminaStudio.BusinessLayer.Interfaces;
using LuminaStudio.Domain.Models.Photographer;
using LuminaStudio.Domain.Models.Responses;

namespace LuminaStudio.BusinessLayer.Structure;

public class PhotographerExecution : PhotographerActions, IPhotographerActions
{
    public PhotographerExecution(IMapper mapper) : base(mapper) {}

    public PhotographerDto? GetById(int id)
    {
        return GetByIdExecution(id);
    }

    public PhotographerDto? GetBySlug(string slug)
    {
        return GetBySlugExecution(slug);
    }

    public List<PhotographerDto> GetAll()
    {
        return GetAllExecution();
    }

    public List<PhotographerDto> GetAllAdmin()
    {
        return GetAllAdminExecution();
    }

    public ActionResponse Create(CreatePhotographerDto dto)
    {
        return CreateExecution(dto);
    }

    public ActionResponse Update(int id, UpdatePhotographerDto dto)
    {
        return UpdateExecution(id, dto);
    }

    public ActionResponse Delete(int id)
    {
        return DeleteExecution(id);
    }

    public ActionResponse SetAvailability(SetAvailabilityDto dto)
    {
        return SetAvailabilityExecution(dto);
    }

    public ActionResponse RemoveAvailability(int photographerId, DateTime date)
    {
        return RemoveAvailabilityExecution(photographerId, date);
    }
}
