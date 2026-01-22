using Microsoft.AspNetCore.Mvc;
using ArchiPortfolio.Application.Interfaces.Services;
using ArchiPortfolio.Domain.Entities;
using Microsoft.AspNetCore.Authorization;

namespace ArchiPortfolio.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly IProjectService _projectService;
        private readonly IPhotoService _photoService;

        // Dependency Injection ile servisleri alıyoruz
        public ProjectsController(IProjectService projectService, IPhotoService photoService)
        {
            _projectService = projectService;
            _photoService = photoService;
        }

        // 1. Tüm Projeleri Getir (Dil destekli)
        // Örnek: GET api/projects?lang=tr
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAll([FromQuery] string lang = "en")
        {
            var result = await _projectService.GetAllProjectsAsync(lang);
            return Ok(result);
        }

        // 2. ID ile Proje Getir
        // Örnek: GET api/projects/5?lang=tr
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetById(int id, [FromQuery] string lang = "en")
        {
            var result = await _projectService.GetProjectByIdAsync(id, lang);
            if (result == null) return NotFound("Proje bulunamadı.");
            return Ok(result);
        }

        // 3. Öne Çıkanları Getir (Ana Sayfa İçin)
        // Örnek: GET api/projects/featured
        [HttpGet("featured")]
        [AllowAnonymous]
        public async Task<IActionResult> GetFeatured([FromQuery] string lang = "en")
        {
            var result = await _projectService.GetFeaturedProjectsAsync(lang);
            return Ok(result);
        }

        // 4. Yeni Proje Ekle (Resim Yüklemeli)
        // Swagger'da bu endpoint dosya seçme butonu çıkarır.
        // [FromForm] sayesinde hem JSON verisi hem de Dosya aynı anda gelir.
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Add([FromForm] Project project, IFormFile? coverImage)
        {
            // Eğer resim seçildiyse yükle ve URL'ini al
            if (coverImage != null)
            {
                var imageUrl = await _photoService.UploadPhotoAsync(coverImage);
                project.CoverImageUrl = imageUrl;
            }

            // Projeyi veritabanına kaydet
            await _projectService.AddProjectAsync(project);
            
            return Ok(new 
            { 
                message = "Proje başarıyla oluşturuldu.", 
                id = project.Id, 
                imageUrl = project.CoverImageUrl 
            });
        }

        // 5. Proje Güncelle
        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Update([FromBody] Project project)
        {
            await _projectService.UpdateProjectAsync(project);
            return Ok(new { message = "Proje güncellendi." });
        }

        // 6. Proje Sil
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            await _projectService.DeleteProjectAsync(id);
            return Ok(new { message = "Proje silindi." });
        }
    }
}