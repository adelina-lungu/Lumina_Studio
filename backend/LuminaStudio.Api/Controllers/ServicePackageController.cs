using LuminaStudio.BusinessLayer;
using LuminaStudio.BusinessLayer.Interfaces;
using LuminaStudio.Domain.Models.ServicePackage;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LuminaStudio.Api.Controllers
{
    [Route("api/packages")]
    [ApiController]
    public class ServicePackageController : ControllerBase
    {
        private readonly IServicePackageActions _packageActions;

        public ServicePackageController()
        {
            var bl = new BusinessLogic();
            _packageActions = bl.GetServicePackageActions();
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var result = _packageActions.GetAll();
            return Ok(result);
        }

        [HttpGet("all")]
        [Authorize(Roles = "Admin,Owner")]
        public IActionResult GetAllAdmin()
        {
            var result = _packageActions.GetAllAdmin();
            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public IActionResult GetById(int id)
        {
            var result = _packageActions.GetById(id);

            if (result == null)
                return NotFound();

            return Ok(result);
        }

        [HttpGet("slug/{slug}")]
        public IActionResult GetBySlug(string slug)
        {
            var result = _packageActions.GetBySlug(slug);

            if (result == null)
                return NotFound();

            return Ok(result);
        }

        [HttpPost]
        [Authorize(Roles = "Admin,Owner")]
        public IActionResult Create([FromBody] CreateServicePackageDto dto)
        {
            var result = _packageActions.Create(dto);

            if (!result.Success)
                return BadRequest(result);

            return StatusCode(201, result);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,Owner")]
        public IActionResult Update(int id, [FromBody] UpdateServicePackageDto dto)
        {
            var result = _packageActions.Update(id, dto);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin,Owner")]
        public IActionResult Delete(int id)
        {
            var result = _packageActions.Delete(id);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }
    }
}
