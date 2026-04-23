using AutoMapper;
using LuminaStudio.BusinessLayer.Core;
using LuminaStudio.BusinessLayer.Interfaces;
using LuminaStudio.Domain.Models.Auth;
using LuminaStudio.Domain.Models.Responses;

namespace LuminaStudio.BusinessLayer.Structure;

public class AuthExecution : AuthActions, IAuthActions
{
    public AuthExecution(IMapper mapper) : base(mapper) {}

    public ActionResponse Register(UserRegisterDto dto)
    {
        return RegisterExecution(dto);
    }

    public (LoginResponseDto? Data, string? Error) Login(UserLoginDto dto)
    {
        return LoginExecution(dto);
    }
}
