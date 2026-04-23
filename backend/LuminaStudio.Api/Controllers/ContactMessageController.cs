using LuminaStudio.BusinessLayer;
using LuminaStudio.BusinessLayer.Interfaces;
using LuminaStudio.Domain.Models.ContactMessage;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace LuminaStudio.Api.Controllers
{
    [Route("api/contact")]
    [ApiController]
    public class ContactMessageController : ControllerBase
    {
        private readonly IContactMessageActions _contactActions;

        public ContactMessageController()
        {
            var bl = new BusinessLogic();
            _contactActions = bl.GetContactMessageActions();
        }

        [HttpGet]
        [Authorize(Roles = "Admin,Owner")]
        public IActionResult GetAll()
        {
            var result = _contactActions.GetAll();
            return Ok(result);
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateContactMessageDto dto)
        {
            int? userId = null;
            if (User.Identity?.IsAuthenticated == true)
                userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

            var result = _contactActions.Create(dto, userId);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpPost("{id}/read")]
        [Authorize(Roles = "Admin,Owner")]
        public IActionResult MarkAsRead(int id)
        {
            var result = _contactActions.MarkAsRead(id);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpPost("{id}/resolve")]
        [Authorize(Roles = "Admin,Owner")]
        public IActionResult MarkAsResolved(int id)
        {
            var result = _contactActions.MarkAsResolved(id);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }
    }
}
