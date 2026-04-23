using AutoMapper;
using LuminaStudio.BusinessLayer.Interfaces;
using LuminaStudio.Domain.Models.Responses;
using LuminaStudio.Domain.Models.ServicePackage;

namespace LuminaStudio.BusinessLayer.Structure;

public class ServicePackageExecution : IServicePackageActions
{
    private readonly IMapper _mapper;

    public ServicePackageExecution(IMapper mapper)
    {
        _mapper = mapper;
    }

    public ServicePackageDto? GetById(int id) => throw new NotImplementedException();
    public ServicePackageDto? GetBySlug(string slug) => throw new NotImplementedException();
    public List<ServicePackageDto> GetAll() => throw new NotImplementedException();
    public ActionResponse Update(int id, UpdateServicePackageDto dto) => throw new NotImplementedException();
}
