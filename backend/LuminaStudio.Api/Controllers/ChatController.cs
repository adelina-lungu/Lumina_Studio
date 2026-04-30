using LuminaStudio.BusinessLayer;
using LuminaStudio.BusinessLayer.Interfaces;
using LuminaStudio.Domain.Enums;
using LuminaStudio.Domain.Models.Chat;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace LuminaStudio.Api.Controllers
{
    [Route("api/chat")]
    [ApiController]
    [Authorize]
    public class ChatController : ControllerBase
    {
        private readonly IChatActions _chatActions;

        public ChatController()
        {
            var bl = new BusinessLogic();
            _chatActions = bl.GetChatActions();
        }

        [HttpGet]
        [Authorize(Roles = "Admin,Owner")]
        public IActionResult GetAll()
        {
            var result = _chatActions.GetAll();
            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public IActionResult GetById(int id)
        {
            var result = _chatActions.GetConversationById(id);

            if (result == null)
                return NotFound();

            return Ok(result);
        }

        [HttpPost("start")]
        public IActionResult StartConversation([FromQuery] string email, [FromQuery] string name)
        {
            if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(name))
                return BadRequest(new { message = "Email and name are required." });

            int? userId = null;
            if (User.Identity?.IsAuthenticated == true)
                userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

            var result = _chatActions.GetOrCreateByEmail(email, name, userId);

            if (result == null)
                return BadRequest();

            return StatusCode(201, result);
        }

        [HttpPost("{conversationId}/messages")]
        public IActionResult SendMessage(int conversationId, [FromBody] SendChatMessageDto dto)
        {
            var senderName = User.FindFirst(ClaimTypes.Name)?.Value ?? "Unknown";
            var roleStr = User.FindFirst(ClaimTypes.Role)?.Value;
            var role = Enum.TryParse<UserRole>(roleStr, out var parsed) ? parsed : UserRole.Client;
            var isStudio = role >= UserRole.Admin;

            var result = _chatActions.SendMessage(conversationId, dto, senderName, isStudio);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpPost("{conversationId}/read")]
        public IActionResult MarkAsRead(int conversationId)
        {
            var result = _chatActions.MarkAsRead(conversationId);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }
    }
}
