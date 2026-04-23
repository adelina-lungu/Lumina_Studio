using LuminaStudio.BusinessLayer;
using LuminaStudio.BusinessLayer.Interfaces;
using LuminaStudio.Domain.Models.FaqItem;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LuminaStudio.Api.Controllers
{
    [Route("api/faq")]
    [ApiController]
    public class FaqItemController : ControllerBase
    {
        private readonly IFaqItemActions _faqActions;

        public FaqItemController()
        {
            var bl = new BusinessLogic();
            _faqActions = bl.GetFaqItemActions();
        }

        [HttpGet]
        public IActionResult GetAll([FromQuery] bool activeOnly = true)
        {
            var result = _faqActions.GetAll(activeOnly);
            return Ok(result);
        }

        [HttpGet("all")]
        [Authorize(Roles = "Admin,Owner")]
        public IActionResult GetAllAdmin()
        {
            var result = _faqActions.GetAll(false);
            return Ok(result);
        }

        [HttpPost]
        [Authorize(Roles = "Admin,Owner")]
        public IActionResult Create([FromBody] CreateFaqItemDto dto)
        {
            var result = _faqActions.Create(dto);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,Owner")]
        public IActionResult Update(int id, [FromBody] UpdateFaqItemDto dto)
        {
            var result = _faqActions.Update(id, dto);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin,Owner")]
        public IActionResult Delete(int id)
        {
            var result = _faqActions.Delete(id);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }
    }
}
