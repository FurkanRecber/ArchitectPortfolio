using System.Collections.Generic;
using System.Threading.Tasks;
using ArchiPortfolio.Application.DTOs;
using ArchiPortfolio.Domain.Entities;

namespace ArchiPortfolio.Application.Interfaces.Services
{
    public interface IProjectService
    {
        // Okuma İşlemleri (Dil kodunu parametre olarak alıyoruz)
        Task<List<ProjectDto>> GetAllProjectsAsync(string langCode);
        Task<ProjectDto> GetProjectByIdAsync(int id, string langCode);
        Task<List<ProjectDto>> GetFeaturedProjectsAsync(string langCode); // Ana sayfa için

        // Yazma İşlemleri (Admin paneli için - Burada dile gerek yok, ham veriyi kaydediyoruz)
        Task AddProjectAsync(Project project);
        Task UpdateProjectAsync(Project project);
        Task DeleteProjectAsync(int id);
    }
}