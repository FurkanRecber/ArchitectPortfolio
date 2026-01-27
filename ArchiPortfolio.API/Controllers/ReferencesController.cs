using ArchiPortfolio.Application.Interfaces.Services;
using ArchiPortfolio.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ArchiPortfolio.API.Controllers
{
    [Authorize] // Admin only
    [Route("api/[controller]")]
    [ApiController]
    public class ReferencesController : ControllerBase
    {
        private readonly IReferenceService _referenceService;

        public ReferencesController(IReferenceService referenceService)
        {
            _referenceService = referenceService;
        }

        [AllowAnonymous] // Public for frontend
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var references = await _referenceService.GetAllReferencesAsync();
            return Ok(references);
        }

        [AllowAnonymous] 
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var reference = await _referenceService.GetReferenceByIdAsync(id);
            if (reference == null) return NotFound();
            return Ok(reference);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromForm] ArchiPortfolio.Application.DTOs.CreateReferenceDto dto)
        {
            var reference = new Reference
            {
                Title = dto.Title,
                Order = dto.Order,
                IsActive = dto.IsActive,
                LogoUrl = "" // Geçici olarak boş, Servis dolduracak
            };
            
            await _referenceService.AddReferenceAsync(reference, dto.LogoFile);
            return Ok(new { message = "Reference added successfully" });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromForm] ArchiPortfolio.Application.DTOs.UpdateReferenceDto dto)
        {
            if (id != dto.Id) return BadRequest("ID Mismatch");
            
            var reference = new Reference
            {
                Id = dto.Id,
                Title = dto.Title,
                Order = dto.Order,
                IsActive = dto.IsActive,
                LogoUrl = "" // Servis mevcut olanı korur veya günceller
            };
            
            await _referenceService.UpdateReferenceAsync(reference, dto.LogoFile);
            return Ok(new { message = "Reference updated successfully" });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _referenceService.DeleteReferenceAsync(id);
            return Ok(new { message = "Reference deleted successfully" });
        }
    }
}
