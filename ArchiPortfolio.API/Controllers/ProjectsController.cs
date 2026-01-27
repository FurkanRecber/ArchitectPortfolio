using Microsoft.AspNetCore.Mvc;
using ArchiPortfolio.Application.DTOs;
using ArchiPortfolio.Application.Interfaces.Services;
using ArchiPortfolio.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Threading.Tasks;
using System.Collections.Generic; // List<> için gerekli

namespace ArchiPortfolio.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly IProjectService _projectService;
        private readonly IPhotoService _photoService;

        public ProjectsController(IProjectService projectService, IPhotoService photoService)
        {
            _projectService = projectService;
            _photoService = photoService;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAll([FromQuery] string lang = "en")
        {
            var result = await _projectService.GetAllProjectsAsync(lang);
            return Ok(result);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetById(int id, [FromQuery] string lang = "en")
        {
            var result = await _projectService.GetProjectByIdAsync(id, lang);
            if (result == null) return NotFound("Proje bulunamadı.");
            return Ok(result);
        }

        [HttpGet("featured")]
        [AllowAnonymous]
        public async Task<IActionResult> GetFeatured([FromQuery] string lang = "en")
        {
            var result = await _projectService.GetFeaturedProjectsAsync(lang);
            return Ok(result);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Add([FromForm] ProjectCreateDto model)
        {
            var project = new Project
            {
                // --- İNGİLİZCE & ORTAK ALANLAR ---
                Title = model.Title,
                Description = model.Description,
                Details = model.Details,
                Client = model.Client,
                Location = model.Location,
                ProjectTeam = model.ProjectTeam,

                // --- TÜRKÇE ALANLAR ---
                TitleTr = model.TitleTr,
                DescriptionTr = model.DescriptionTr,
                DetailsTr = model.DetailsTr,
                
                // Veritabanı zorunlu tuttuğu için kopyalıyoruz
                ClientTr = model.Client,         
                LocationTr = model.Location,     
                ProjectTeamTr = model.ProjectTeam, 

                // --- DİĞER ALANLAR ---
                ProjectYear = model.ProjectYear,
                Area = model.Area,
                Status = model.Status,
                IsFeatured = model.IsFeatured,
                CategoryId = model.CategoryId,
                
                Slug = GenerateSlug(model.Title),
                PublishDate = DateTime.UtcNow, 
                CoverImageUrl = ""
            };

            // 1. Kapak Resmi Yükleme
            if (model.CoverImage != null)
            {
                project.CoverImageUrl = await _photoService.UploadPhotoAsync(model.CoverImage, "projects");
            }

            // 2. Galeri Resimlerini Yükleme (BU KISIM EKLENDİ)
            if (model.GalleryImages != null && model.GalleryImages.Count > 0)
            {
                project.ProjectImages = new List<ProjectImage>();

                foreach (var file in model.GalleryImages)
                {
                    // Her dosyayı yükle
                    var galleryUrl = await _photoService.UploadPhotoAsync(file, "projects");
                    
                    // Listeye ekle
                    project.ProjectImages.Add(new ProjectImage 
                    { 
                        ImageUrl = galleryUrl, 
                        IsPlan = false 
                    });
                }
            }

            await _projectService.AddProjectAsync(project);
            
            return Ok(new { message = "Proje başarıyla oluşturuldu.", id = project.Id });
        }

        [HttpPut]
        [Authorize] 
        public async Task<IActionResult> Update([FromForm] ProjectUpdateDto updateDto)
        {
            await _projectService.UpdateProjectAsync(updateDto);
            return Ok(new { message = "Proje başarıyla güncellendi." });
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            await _projectService.DeleteProjectAsync(id);
            return Ok(new { message = "Proje silindi." });
        }

        private string GenerateSlug(string title)
        {
            if (string.IsNullOrEmpty(title)) return "";
            return title.ToLower()
                .Replace(" ", "-")
                .Replace("ç", "c")
                .Replace("ğ", "g")
                .Replace("ı", "i")
                .Replace("ö", "o")
                .Replace("ş", "s")
                .Replace("ü", "u");
        }
    }
}