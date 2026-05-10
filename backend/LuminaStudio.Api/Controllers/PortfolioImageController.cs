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

            return StatusCode(201, result);
        }

        private static readonly Dictionary<string, byte[][]> AllowedSignatures = new()
        {
            { ".jpg",  new[] { new byte[] { 0xFF, 0xD8, 0xFF } } },
            { ".jpeg", new[] { new byte[] { 0xFF, 0xD8, 0xFF } } },
            { ".png",  new[] { new byte[] { 0x89, 0x50, 0x4E, 0x47 } } },
            { ".webp", new[] { new byte[] { 0x52, 0x49, 0x46, 0x46 } } },
        };

        private static readonly HashSet<string> AllowedMimeTypes = new()
        {
            "image/jpeg", "image/png", "image/webp"
        };

        [HttpPost("upload")]
        [Authorize(Roles = "Admin,Owner")]
        [RequestSizeLimit(15 * 1024 * 1024)]
        public async Task<IActionResult> Upload(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest(new { message = "No file provided." });

            var ext = Path.GetExtension(file.FileName).ToLowerInvariant();

            if (!AllowedSignatures.ContainsKey(ext))
                return BadRequest(new { message = "Only JPG, PNG, and WebP files are allowed." });

            if (!AllowedMimeTypes.Contains(file.ContentType.ToLowerInvariant()))
                return BadRequest(new { message = "Invalid file type." });

            using var fileStream = file.OpenReadStream();
            var headerBytes = new byte[8];
            await fileStream.ReadAsync(headerBytes, 0, headerBytes.Length);

            var validSignature = AllowedSignatures[ext]
                .Any(sig => headerBytes.Length >= sig.Length && headerBytes.Take(sig.Length).SequenceEqual(sig));

            if (!validSignature)
                return BadRequest(new { message = "File content does not match its extension." });

            var uploadsDir = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
            Directory.CreateDirectory(uploadsDir);

            var fileName = $"{Guid.NewGuid()}{ext}";
            var filePath = Path.Combine(uploadsDir, fileName);

            fileStream.Seek(0, SeekOrigin.Begin);
            using (var outStream = new FileStream(filePath, FileMode.Create))
            {
                await fileStream.CopyToAsync(outStream);
            }

            var url = $"/uploads/{fileName}";
            return StatusCode(201, new { url });
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin,Owner")]
        public IActionResult Delete(int id)
        {
            var image = _portfolioActions.GetById(id);

            var result = _portfolioActions.Delete(id);

            if (!result.Success)
                return BadRequest(result);

            if (image != null && image.Src.StartsWith("/uploads/"))
            {
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", image.Src.TrimStart('/'));
                if (System.IO.File.Exists(filePath))
                    System.IO.File.Delete(filePath);
            }

            return NoContent();
        }
    }
}
