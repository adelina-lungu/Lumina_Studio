using AutoMapper;
using LuminaStudio.BusinessLayer.Interfaces;
using LuminaStudio.Domain.Models.Auth;
using LuminaStudio.Domain.Models.Responses;

namespace LuminaStudio.BusinessLayer.Structure;

public class AuthExecution : IAuthActions
{
    private readonly IMapper _mapper;

    public AuthExecution(IMapper mapper)
    {
        _mapper = mapper;
    }

    public ActionResponse Register(UserRegisterDto dto)
    {
        throw new NotImplementedException();
    }

    public (LoginResponseDto? Data, string? Error) Login(UserLoginDto dto)
    {
        throw new NotImplementedException();
    }
}
