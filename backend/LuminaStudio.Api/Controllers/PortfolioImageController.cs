using LuminaStudio.BusinessLayer;
using LuminaStudio.BusinessLayer.Interfaces;
using LuminaStudio.Domain.Enums;
using LuminaStudio.Domain.Models.PortfolioImage;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LuminaStudio.Api.Controllers
{
    [Route("api/portfolio")]
    [ApiController]
    public class PortfolioImageController : ControllerBase
    {
        private readonly IPortfolioImageActions _portfolioActions;

        public PortfolioImageController()
        {
            var bl = new BusinessLogic();
            _portfolioActions = bl.GetPortfolioImageActions();
        }

        [HttpGet]
        public IActionResult GetAll([FromQuery] PortfolioCategory? category = null)
        {
            var result = _portfolioActions.GetAll(category);
            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public IActionResult GetById(int id)
        {
            var result = _portfolioActions.GetById(id);

            if (result == null)
                return NotFound();

            return Ok(result);
        }

        [HttpPost]
        [Authorize(Roles = "Admin,Owner")]
        public IActionResult Create([FromBody] CreatePortfolioImageDto dto)
        {
            var result = _portfolioActions.Create(dto);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin,Owner")]
        public IActionResult Delete(int id)
        {
            var result = _portfolioActions.Delete(id);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }
    }
}
