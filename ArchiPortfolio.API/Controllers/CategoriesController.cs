using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using ArchiPortfolio.Application.Interfaces.Services;
using ArchiPortfolio.Domain.Entities;

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
        public async Task<IActionResult> GetById(int id, [FromQuery] string lang = "en")
        {
            var result = await _categoryService.GetCategoryByIdAsync(id, lang);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Add(Category category)
        {
            await _categoryService.AddCategoryAsync(category);
            return Ok(new { message = "Kategori eklendi", id = category.Id });
        }

        [HttpPut]
        public async Task<IActionResult> Update(Category category)
        {
            await _categoryService.UpdateCategoryAsync(category);
            return Ok(new { message = "Kategori güncellendi" });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _categoryService.DeleteCategoryAsync(id);
            return Ok(new { message = "Kategori silindi" });
        }
    }
}