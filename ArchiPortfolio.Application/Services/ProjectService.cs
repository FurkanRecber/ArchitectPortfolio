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

        public async Task UpdateProjectAsync(Project project)
        {
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