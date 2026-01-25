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

        // --- BU KISIM EKLENDİ (404 Hatasını Çözer) ---
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var message = await _contactMessageService.GetMessageByIdAsync(id);
            if (message == null) return NotFound("Mesaj bulunamadı.");
            return Ok(message);
        }

        [HttpPost("{id}/reply")]
        public async Task<IActionResult> Reply(int id, [FromBody] ReplyDto replyDto)
        {
            try
            {
                await _contactMessageService.ReplyToMessageAsync(id, replyDto.Subject, replyDto.MessageBody);
                return Ok(new { message = "Reply sent successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("{id}/read")]
        public async Task<IActionResult> MarkAsRead(int id)
        {
            await _contactMessageService.MarkAsReadAsync(id);
            return NoContent();
        }
    }

    public class ReplyDto
    {
        public string Subject { get; set; }
        public string MessageBody { get; set; }
    }
}