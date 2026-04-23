using LuminaStudio.BusinessLayer;
using LuminaStudio.BusinessLayer.Interfaces;
using LuminaStudio.Domain.Enums;
using LuminaStudio.Domain.Models.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace LuminaStudio.Api.Controllers
{
    [Route("api/users")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUserActions _userActions;

        public UserController()
        {
            var bl = new BusinessLogic();
            _userActions = bl.GetUserActions();
        }

        [HttpGet]
        [Authorize(Roles = "Admin,Owner")]
        public IActionResult GetAll()
        {
            var result = _userActions.GetAll();
            return Ok(result);
        }

        [HttpGet("{id:int}")]
        [AllowAnonymous]
        public IActionResult GetById(int id)
        {
            var result = _userActions.GetById(id);

            if (result == null)
                return NotFound();

            return Ok(result);
        }

        [HttpGet("my")]
        public IActionResult GetMyProfile()
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var result = _userActions.GetById(currentUserId);

            if (result == null)
                return NotFound();

            return Ok(result);
        }

        [HttpPut("{id}/profile")]
        public IActionResult UpdateProfile(int id, [FromBody] UpdateUserProfileDto dto)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

            if (currentUserId != id)
                return Forbid();

            var result = _userActions.UpdateProfile(id, dto);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpPost("{id}/ban")]
        [Authorize(Roles = "Admin,Owner")]
        public IActionResult Ban(int id)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var roleStr = User.FindFirst(ClaimTypes.Role)?.Value;
            var currentUserRole = Enum.TryParse<UserRole>(roleStr, out var parsed) ? parsed : UserRole.Client;

            var result = _userActions.Ban(id, currentUserId, currentUserRole);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpPost("{id}/unban")]
        [Authorize(Roles = "Admin,Owner")]
        public IActionResult Unban(int id)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var roleStr = User.FindFirst(ClaimTypes.Role)?.Value;
            var currentUserRole = Enum.TryParse<UserRole>(roleStr, out var parsed) ? parsed : UserRole.Client;

            var result = _userActions.Unban(id, currentUserId, currentUserRole);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpPost("{id}/promote")]
        [Authorize(Roles = "Owner")]
        public IActionResult Promote(int id)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var roleStr = User.FindFirst(ClaimTypes.Role)?.Value;
            var currentUserRole = Enum.TryParse<UserRole>(roleStr, out var parsed) ? parsed : UserRole.Client;

            var result = _userActions.Promote(id, currentUserId, currentUserRole);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpPost("{id}/demote")]
        [Authorize(Roles = "Owner")]
        public IActionResult Demote(int id)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var roleStr = User.FindFirst(ClaimTypes.Role)?.Value;
            var currentUserRole = Enum.TryParse<UserRole>(roleStr, out var parsed) ? parsed : UserRole.Client;

            var result = _userActions.Demote(id, currentUserId, currentUserRole);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }
    }
}
