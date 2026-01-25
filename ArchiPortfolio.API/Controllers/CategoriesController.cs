using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using ArchiPortfolio.Application.DTOs;
using ArchiPortfolio.Application.Interfaces.Services;

namespace ArchiPortfolio.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoriesController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string lang = "en")
        {
            var result = await _categoryService.GetAllCategoriesAsync(lang);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _categoryService.GetCategoryByIdAsync(id);
            if (result == null) return NotFound();
            return Ok(result);
        }

        // Değişiklik: [FromForm] kullanıyoruz (Resim + Veri)
        [HttpPost]
        public async Task<IActionResult> Add([FromForm] CreateCategoryDto createDto)
        {
            await _categoryService.AddCategoryAsync(createDto);
            return Ok(new { message = "Kategori eklendi" });
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromForm] CreateCategoryDto updateDto)
        {
            await _categoryService.UpdateCategoryAsync(updateDto);
            return Ok(new { message = "Kategori güncellendi" });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _categoryService.DeleteCategoryAsync(id);
                return Ok(new { message = "Kategori silindi" });
            }
            catch (System.InvalidOperationException ex)
            {
                // Özel hata mesajını (Projeler var uyarısını) Frontend'e gönder
                return BadRequest(new { message = ex.Message });
            }
            catch (System.Exception ex)
            {
                // Beklenmedik diğer hatalar
                return StatusCode(500, new { message = "Silme işlemi sırasında beklenmedik bir hata oluştu." });
            }
        }
    }
}