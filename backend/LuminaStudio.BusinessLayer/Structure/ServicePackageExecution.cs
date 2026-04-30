using AutoMapper;
using LuminaStudio.BusinessLayer.Core;
using LuminaStudio.BusinessLayer.Interfaces;
using LuminaStudio.Domain.Models.Responses;
using LuminaStudio.Domain.Models.ServicePackage;

namespace LuminaStudio.BusinessLayer.Structure;

public class ServicePackageExecution : ServicePackageActions, IServicePackageActions
{
    public ServicePackageExecution(IMapper mapper) : base(mapper) {}

    public ServicePackageDto? GetById(int id)
    {
        return GetByIdExecution(id);
    }

    public ServicePackageDto? GetBySlug(string slug)
    {
        return GetBySlugExecution(slug);
    }

    public List<ServicePackageDto> GetAll()
    {
        return GetAllExecution();
    }

    public List<ServicePackageDto> GetAllAdmin()
    {
        return GetAllAdminExecution();
    }

    public ActionResponse Create(CreateServicePackageDto dto)
    {
        return ActionResponse.SafeExecute(() => CreateExecution(dto));
    }

    public ActionResponse Update(int id, UpdateServicePackageDto dto)
    {
        return ActionResponse.SafeExecute(() => UpdateExecution(id, dto));
    }

    public ActionResponse Delete(int id)
    {
        return ActionResponse.SafeExecute(() => DeleteExecution(id));
    }
}
