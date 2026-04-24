using LuminaStudio.BusinessLayer;
using LuminaStudio.BusinessLayer.Interfaces;
using LuminaStudio.Domain.Models.Testimonial;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LuminaStudio.Api.Controllers
{
    [Route("api/testimonials")]
    [ApiController]
    public class TestimonialController : ControllerBase
    {
        private readonly ITestimonialActions _testimonialActions;

        public TestimonialController()
        {
            var bl = new BusinessLogic();
            _testimonialActions = bl.GetTestimonialActions();
        }

        [HttpGet]
        public IActionResult GetAll([FromQuery] bool approvedOnly = true)
        {
            var result = _testimonialActions.GetAll(approvedOnly);
            return Ok(result);
        }

        [HttpGet("all")]
        [Authorize(Roles = "Admin,Owner")]
        public IActionResult GetAllAdmin()
        {
            var result = _testimonialActions.GetAll(false);
            return Ok(result);
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateTestimonialDto dto)
        {
            var result = _testimonialActions.Create(dto);

            if (!result.Success)
                return BadRequest(result);

            return StatusCode(201, result);
        }

        [HttpPost("{id}/approve")]
        [Authorize(Roles = "Admin,Owner")]
        public IActionResult Approve(int id)
        {
            var result = _testimonialActions.Approve(id);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin,Owner")]
        public IActionResult Delete(int id)
        {
            var result = _testimonialActions.Delete(id);

            if (!result.Success)
                return BadRequest(result);

            return NoContent();
        }
    }
}
