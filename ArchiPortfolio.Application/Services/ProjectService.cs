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

        public ProjectService(IGenericRepository<Project> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<List<ProjectDto>> GetAllProjectsAsync(string langCode)
        {
            // 1. Veritabanından ham veriyi çek (Kategori ve Resimlerle birlikte)
            // Not: Repository'de Include yapmak gerekebilir, şimdilik düz çekiyoruz.
            // İlişkili veriler (Category) null gelirse GenericRepository'e Include ekleyeceğiz.
            var projects = await _repository.GetAllAsync();

            // 2. DTO listesine dönüştür
            var dtos = new List<ProjectDto>();

            foreach (var project in projects)
            {
                // Tek tek map'liyoruz ki dil kontrolü yapabilelim
                var dto = _mapper.Map<ProjectDto>(project);

                // DİL KONTROLÜ: Eğer Türkçe isteniyorsa, TR alanlarını ana alanlara ata
                if (langCode == "tr")
                {
                    dto.Title = !string.IsNullOrEmpty(project.TitleTr) ? project.TitleTr : project.Title;
                    dto.Description = !string.IsNullOrEmpty(project.DescriptionTr) ? project.DescriptionTr : project.Description;
                    dto.Details = !string.IsNullOrEmpty(project.DetailsTr) ? project.DetailsTr : project.Details;
                    dto.Client = !string.IsNullOrEmpty(project.ClientTr) ? project.ClientTr : project.Client;
                    dto.Location = !string.IsNullOrEmpty(project.LocationTr) ? project.LocationTr : project.Location;
                    dto.ProjectTeam = !string.IsNullOrEmpty(project.ProjectTeamTr) ? project.ProjectTeamTr : project.ProjectTeam;
                }

                dtos.Add(dto);
            }

            return dtos.OrderByDescending(x => x.PublishDate).ToList();
        }

        public async Task<ProjectDto> GetProjectByIdAsync(int id, string langCode)
        {
            var project = await _repository.GetByIdAsync(id);
            if (project == null) return null;

            var dto = _mapper.Map<ProjectDto>(project);

            // Dil Kontrolü
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
            // Sadece "IsFeatured" olanları getir
            var projects = await _repository.GetWhereAsync(x => x.IsFeatured == true);
            
            var dtos = new List<ProjectDto>();
            foreach (var project in projects)
            {
                var dto = _mapper.Map<ProjectDto>(project);
                if (langCode == "tr")
                {
                    dto.Title = !string.IsNullOrEmpty(project.TitleTr) ? project.TitleTr : project.Title;
                    dto.Description = !string.IsNullOrEmpty(project.DescriptionTr) ? project.DescriptionTr : project.Description;
                    // Diğer alanlar listede gerekmiyorsa atlamabiliriz
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

        public async Task UpdateProjectAsync(Project project)
        {
            _repository.Update(project);
            await _repository.SaveChangesAsync();
        }

        public async Task DeleteProjectAsync(int id)
        {
            var project = await _repository.GetByIdAsync(id);
            if (project != null)
            {
                _repository.Delete(project);
                await _repository.SaveChangesAsync();
            }
        }
    }
}