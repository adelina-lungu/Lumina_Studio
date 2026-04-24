using LuminaStudio.Domain.Models.Responses;
using LuminaStudio.Domain.Models.ServicePackage;

namespace LuminaStudio.BusinessLayer.Interfaces
{
    public interface IServicePackageActions
    {
        ServicePackageDto? GetById(int id);
        ServicePackageDto? GetBySlug(string slug);
        List<ServicePackageDto> GetAll();
        ActionResponse Update(int id, UpdateServicePackageDto dto);
    }
}
