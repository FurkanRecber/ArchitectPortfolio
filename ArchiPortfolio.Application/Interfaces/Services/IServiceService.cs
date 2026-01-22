using ArchiPortfolio.Application.DTOs;
using ArchiPortfolio.Domain.Entities;

namespace ArchiPortfolio.Application.Interfaces.Services
{
    public interface IServiceService
    {
        Task<List<ServiceDto>> GetAllServicesAsync(string langCode);
        Task AddServiceAsync(Service service);
        Task UpdateServiceAsync(Service service);
        Task DeleteServiceAsync(int id);
    }
}