using AutoMapper;
using ArchiPortfolio.Application.DTOs;
using ArchiPortfolio.Application.Interfaces.Repositories;
using ArchiPortfolio.Application.Interfaces.Services;
using ArchiPortfolio.Domain.Entities;

namespace ArchiPortfolio.Application.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IGenericRepository<Project> _repository;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;

        public ProjectService(IGenericRepository<Project> repository, IMapper mapper, IPhotoService photoService)
        {
            _repository = repository;
            _mapper = mapper;
            _photoService = photoService;
        }

        public async Task<List<ProjectDto>> GetAllProjectsAsync(string langCode)
        {
            // Category tablosunu dahil et (Include)
            var projects = await _repository.GetAllAsync(x => x.Category); 
    
            var dtos = new List<ProjectDto>();

            foreach (var p in projects)
            {
                var dto = _mapper.Map<ProjectDto>(p);
        
                // Kategori ismi dil kontrolü (Opsiyonel, eğer kategori isimleri de çevriliyorsa)
                if (p.Category != null)
                {
                    dto.CategoryName = (langCode == "tr" && !string.IsNullOrEmpty(p.Category.NameTr)) 
                        ? p.Category.NameTr 
                        : p.Category.Name;
                }

                // Proje dili kontrolü
                if (langCode == "tr")
                {
                    dto.Title = !string.IsNullOrEmpty(p.TitleTr) ? p.TitleTr : p.Title;
                    dto.Description = !string.IsNullOrEmpty(p.DescriptionTr) ? p.DescriptionTr : p.Description;
                }
        
                dtos.Add(dto);
            }
            return dtos;
        }

        public async Task<ProjectDto> GetProjectByIdAsync(int id, string langCode)
        {
            // GÜNCELLEME: ProjectImages ve Category tablolarını da Include ettik
            var project = await _repository.GetByIdAsync(id, 
                x => x.ProjectImages, 
                x => x.Category
            );
            
            if (project == null) return null;

            var dto = _mapper.Map<ProjectDto>(project);

            if (langCode == "tr")
            {
                dto.Title = !string.IsNullOrEmpty(project.TitleTr) ? project.TitleTr : project.Title;
                dto.Description = !string.IsNullOrEmpty(project.DescriptionTr) ? project.DescriptionTr : project.Description;
                dto.Details = !string.IsNullOrEmpty(project.DetailsTr) ? project.DetailsTr : project.Details;
                dto.Client = !string.IsNullOrEmpty(project.ClientTr) ? project.ClientTr : project.Client;
                dto.Location = !string.IsNullOrEmpty(project.LocationTr) ? project.LocationTr : project.Location;
                dto.ProjectTeam = !string.IsNullOrEmpty(project.ProjectTeamTr) ? project.ProjectTeamTr : project.ProjectTeam;
            }

            return dto;
        }

        public async Task<List<ProjectDto>> GetFeaturedProjectsAsync(string langCode)
        {
            // GÜNCELLEME: Şarta ek olarak Include'ları da gönderiyoruz
            var projects = await _repository.GetWhereAsync(
                x => x.IsFeatured == true,
                x => x.ProjectImages,
                x => x.Category
            );
            
            var dtos = new List<ProjectDto>();
            foreach (var project in projects)
            {
                var dto = _mapper.Map<ProjectDto>(project);
                if (langCode == "tr")
                {
                    dto.Title = !string.IsNullOrEmpty(project.TitleTr) ? project.TitleTr : project.Title;
                    dto.Description = !string.IsNullOrEmpty(project.DescriptionTr) ? project.DescriptionTr : project.Description;
                }
                dtos.Add(dto);
            }
            return dtos;
        }

        public async Task AddProjectAsync(Project project)
        {
            await _repository.AddAsync(project);
            await _repository.SaveChangesAsync();
        }

        public async Task UpdateProjectAsync(ProjectUpdateDto dto)
{
    // 1. Mevcut projeyi (Resimleriyle birlikte) çek
    var project = await _repository.GetByIdAsync(dto.Id, x => x.ProjectImages);
    
    if (project == null) throw new Exception("Proje bulunamadı.");

    // 2. Metin Alanlarını Güncelle (AutoMapper kullanabilirsin veya elle)
    // _mapper.Map(dto, project); // AutoMapper kullanırsan CoverImage'i ezmemesine dikkat et
    
    // Elle güncellemek daha güvenli olabilir:
    project.Title = dto.Title;
    project.Description = dto.Description;
    project.Details = dto.Details;
    project.Client = dto.Client;
    project.Location = dto.Location;
    project.ProjectTeam = dto.ProjectTeam;
    project.ProjectYear = dto.ProjectYear;
    project.Area = dto.Area;
    project.Status = dto.Status;
    project.CategoryId = dto.CategoryId;
    project.IsFeatured = dto.IsFeatured;
    
    // TR Alanlar
    project.TitleTr = dto.TitleTr;
    project.DescriptionTr = dto.DescriptionTr;
    project.DetailsTr = dto.DetailsTr;
    // ... diğer TR alanlar ...

    // 3. KAPAK RESMİ GÜNCELLEME
    if (dto.CoverImage != null)
    {
        // Eski resmi sil (İsteğe bağlı, çöp birikmesin diye önerilir)
        if (!string.IsNullOrEmpty(project.CoverImageUrl))
        {
            _photoService.DeletePhoto(project.CoverImageUrl);
        }
        // Yeni resmi yükle
        project.CoverImageUrl = await _photoService.UploadPhotoAsync(dto.CoverImage, "projects");
    }

    // 4. YENİ GALERİ RESİMLERİ EKLEME
    if (dto.GalleryImages != null && dto.GalleryImages.Count > 0)
    {
        foreach (var file in dto.GalleryImages)
        {
            var url = await _photoService.UploadPhotoAsync(file, "projects");
            project.ProjectImages.Add(new ProjectImage 
            { 
                ImageUrl = url, 
                IsPlan = false // Plan mı normal mi ayrımı frontend'den gelmeli ama şimdilik false
            });
        }
    }

    // 5. SİLİNMEK İSTENEN GALERİ RESİMLERİ
    if (dto.DeletedGalleryImages != null && dto.DeletedGalleryImages.Count > 0)
    {
        foreach (var url in dto.DeletedGalleryImages)
        {
            var imgToDelete = project.ProjectImages.FirstOrDefault(x => x.ImageUrl == url);
            if (imgToDelete != null)
            {
                _photoService.DeletePhoto(imgToDelete.ImageUrl); // Fiziksel sil
                project.ProjectImages.Remove(imgToDelete); // Veritabanından sil
            }
        }
    }

    _repository.Update(project);
    await _repository.SaveChangesAsync();
}

        public async Task DeleteProjectAsync(int id)
        {
            // Silme işlemi için Include'a gerek yok, ID yetiyor
            var project = await _repository.GetByIdAsync(id);
            if (project != null)
            {
                _repository.Delete(project);
                await _repository.SaveChangesAsync();
            }
        }
    }
}