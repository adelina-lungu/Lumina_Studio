using AutoMapper;
using LuminaStudio.BusinessLayer.Core;
using LuminaStudio.BusinessLayer.Interfaces;
using LuminaStudio.Domain.Enums;
using LuminaStudio.Domain.Models.PortfolioImage;
using LuminaStudio.Domain.Models.Responses;

namespace LuminaStudio.BusinessLayer.Structure;

public class PortfolioImageExecution : PortfolioImageActions, IPortfolioImageActions
{
    public PortfolioImageExecution(IMapper mapper) : base(mapper) {}

    public PortfolioImageDto? GetById(int id)
    {
        return GetByIdExecution(id);
    }

    public List<PortfolioImageDto> GetAll(PortfolioCategory? category = null)
    {
        return GetAllExecution(category);
    }

    public ActionResponse Create(CreatePortfolioImageDto dto)
    {
        return CreateExecution(dto);
    }

    public ActionResponse Delete(int id)
    {
        return DeleteExecution(id);
    }
}
