using AutoMapper;
using LuminaStudio.BusinessLayer.Interfaces;
using LuminaStudio.Domain.Models.Photographer;
using LuminaStudio.Domain.Models.Responses;

namespace LuminaStudio.BusinessLayer.Structure;

public class PhotographerExecution : IPhotographerActions
{
    private readonly IMapper _mapper;

    public PhotographerExecution(IMapper mapper)
    {
        _mapper = mapper;
    }

    public PhotographerDto? GetById(int id) => throw new NotImplementedException();
    public PhotographerDto? GetBySlug(string slug) => throw new NotImplementedException();
    public List<PhotographerDto> GetAll() => throw new NotImplementedException();
    public ActionResponse Update(int id, UpdatePhotographerDto dto) => throw new NotImplementedException();
    public ActionResponse SetAvailability(SetAvailabilityDto dto) => throw new NotImplementedException();
    public ActionResponse RemoveAvailability(int photographerId, DateTime date) => throw new NotImplementedException();
}
