using LuminaStudio.BusinessLayer;
using LuminaStudio.BusinessLayer.Interfaces;
using LuminaStudio.Domain.Models.Photographer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LuminaStudio.Api.Controllers
{
    [Route("api/photographers")]
    [ApiController]
    public class PhotographerController : ControllerBase
    {
        private readonly IPhotographerActions _photographerActions;

        public PhotographerController()
        {
            var bl = new BusinessLogic();
            _photographerActions = bl.GetPhotographerActions();
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var result = _photographerActions.GetAll();
            return Ok(result);
        }

        [HttpGet("all")]
        [Authorize(Roles = "Admin,Owner")]
        public IActionResult GetAllAdmin()
        {
            var result = _photographerActions.GetAllAdmin();
            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public IActionResult GetById(int id)
        {
            var result = _photographerActions.GetById(id);

            if (result == null)
                return NotFound();

            return Ok(result);
        }

        [HttpGet("slug/{slug}")]
        public IActionResult GetBySlug(string slug)
        {
            var result = _photographerActions.GetBySlug(slug);

            if (result == null)
                return NotFound();

            return Ok(result);
        }

        [HttpPost]
        [Authorize(Roles = "Admin,Owner")]
        public IActionResult Create([FromBody] CreatePhotographerDto dto)
        {
            var result = _photographerActions.Create(dto);

            if (!result.Success)
                return BadRequest(result);

            return StatusCode(201, result);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,Owner")]
        public IActionResult Update(int id, [FromBody] UpdatePhotographerDto dto)
        {
            var result = _photographerActions.Update(id, dto);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin,Owner")]
        public IActionResult Delete(int id)
        {
            var result = _photographerActions.Delete(id);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpPost("availability")]
        [Authorize(Roles = "Admin,Owner")]
        public IActionResult SetAvailability([FromBody] SetAvailabilityDto dto)
        {
            var result = _photographerActions.SetAvailability(dto);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpDelete("{photographerId}/availability/{date}")]
        [Authorize(Roles = "Admin,Owner")]
        public IActionResult RemoveAvailability(int photographerId, DateTime date)
        {
            var result = _photographerActions.RemoveAvailability(photographerId, date);

            if (!result.Success)
                return BadRequest(result);

            return NoContent();
        }
    }
}
