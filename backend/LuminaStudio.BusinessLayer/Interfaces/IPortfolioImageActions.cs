using LuminaStudio.Domain.Enums;
using LuminaStudio.Domain.Models.PortfolioImage;
using LuminaStudio.Domain.Models.Responses;

namespace LuminaStudio.BusinessLayer.Interfaces
{
    public interface IPortfolioImageActions
    {
        PortfolioImageDto? GetById(int id);
        List<PortfolioImageDto> GetAll(PortfolioCategory? category = null);
        ActionResponse Create(CreatePortfolioImageDto dto);
        ActionResponse Delete(int id);
    }
}
