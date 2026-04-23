using LuminaStudio.BusinessLayer;
using LuminaStudio.BusinessLayer.Interfaces;
using LuminaStudio.Domain.Models.Booking;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace LuminaStudio.Api.Controllers
{
    [Route("api/bookings")]
    [ApiController]
    [Authorize]
    public class BookingController : ControllerBase
    {
        private readonly IBookingActions _bookingActions;

        public BookingController()
        {
            var bl = new BusinessLogic();
            _bookingActions = bl.GetBookingActions();
        }

        [HttpGet]
        [Authorize(Roles = "Admin,Owner")]
        public IActionResult GetAll([FromQuery] BookingFilterDto filter)
        {
            var result = _bookingActions.GetAll(filter);
            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public IActionResult GetById(int id)
        {
            var result = _bookingActions.GetById(id);

            if (result == null)
                return NotFound();

            return Ok(result);
        }

        [HttpGet("my")]
        public IActionResult GetMyBookings()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var result = _bookingActions.GetByUserId(userId);
            return Ok(result);
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateBookingDto dto)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var result = _bookingActions.Create(dto, userId);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpPost("{id}/cancel")]
        public IActionResult Cancel(int id)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var result = _bookingActions.Cancel(id, userId);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpPost("{id}/confirm")]
        [Authorize(Roles = "Admin,Owner")]
        public IActionResult Confirm(int id)
        {
            var result = _bookingActions.Confirm(id);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpPost("{id}/complete")]
        [Authorize(Roles = "Admin,Owner")]
        public IActionResult Complete(int id)
        {
            var result = _bookingActions.Complete(id);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }
    }
}
