using LuminaStudio.BusinessLayer;
using LuminaStudio.BusinessLayer.Interfaces;
using LuminaStudio.Domain.Models.Auth;
using LuminaStudio.Domain.Models.Responses;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace LuminaStudio.Api.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthActions _authActions;

        public AuthController()
        {
            var businessLogic = new BusinessLogic();
            _authActions = businessLogic.GetAuthActions();
        }

        [HttpPost("login")]
        [EnableRateLimiting("auth")]
        public IActionResult Login([FromBody] UserLoginDto dto)
        {
            var (data, error) = _authActions.Login(dto);

            if (data == null)
                return Unauthorized(ActionResponse.Fail(error ?? "Invalid email or password."));

            return Ok(data);
        }

        [HttpPost("register")]
        [EnableRateLimiting("auth")]
        public IActionResult Register([FromBody] UserRegisterDto dto)
        {
            var result = _authActions.Register(dto);

            if (!result.Success)
                return BadRequest(result);

            return StatusCode(201, result);
        }
    }
}
