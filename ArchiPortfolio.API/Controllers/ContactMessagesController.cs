using ArchiPortfolio.Application.DTOs;
using ArchiPortfolio.Application.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace ArchiPortfolio.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactMessagesController : ControllerBase
    {
        private readonly IContactMessageService _contactMessageService;

        public ContactMessagesController(IContactMessageService contactMessageService)
        {
            _contactMessageService = contactMessageService;
        }

        [HttpPost]
        public async Task<IActionResult> SendMessage([FromBody] CreateContactMessageDto createDto)
        {
            await _contactMessageService.CreateMessageAsync(createDto);
            return Ok(new { message = "Message sent successfully" });
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var messages = await _contactMessageService.GetAllMessagesAsync();
            return Ok(messages);
        }

        [HttpPut("{id}/read")]
        public async Task<IActionResult> MarkAsRead(int id)
        {
            await _contactMessageService.MarkAsReadAsync(id);
            return NoContent();
        }
    }
}