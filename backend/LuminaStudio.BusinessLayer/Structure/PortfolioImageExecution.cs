using AutoMapper;
using LuminaStudio.BusinessLayer.Interfaces;
using LuminaStudio.Domain.Enums;
using LuminaStudio.Domain.Models.PortfolioImage;
using LuminaStudio.Domain.Models.Responses;

namespace LuminaStudio.BusinessLayer.Structure;

public class PortfolioImageExecution : IPortfolioImageActions
{
    private readonly IMapper _mapper;

    public PortfolioImageExecution(IMapper mapper)
    {
        _mapper = mapper;
    }

    public PortfolioImageDto? GetById(int id) => throw new NotImplementedException();
    public List<PortfolioImageDto> GetAll(PortfolioCategory? category = null) => throw new NotImplementedException();
    public ActionResponse Create(CreatePortfolioImageDto dto) => throw new NotImplementedException();
    public ActionResponse Delete(int id) => throw new NotImplementedException();
}
