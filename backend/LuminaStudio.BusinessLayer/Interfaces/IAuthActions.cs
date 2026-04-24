using LuminaStudio.Domain.Models.Auth;
using LuminaStudio.Domain.Models.Responses;

namespace LuminaStudio.BusinessLayer.Interfaces
{
    public interface IAuthActions
    {
        ActionResponse Register(UserRegisterDto dto);
        (LoginResponseDto? Data, string? Error) Login(UserLoginDto dto);
    }
}
