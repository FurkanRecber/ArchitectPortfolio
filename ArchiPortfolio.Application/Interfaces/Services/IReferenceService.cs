using System.Collections.Generic;
using System.Threading.Tasks;
using ArchiPortfolio.Domain.Entities;
using Microsoft.AspNetCore.Http;

namespace ArchiPortfolio.Application.Interfaces.Services
{
    public interface IReferenceService
    {
        Task<List<Reference>> GetAllReferencesAsync();
        Task<Reference> GetReferenceByIdAsync(int id);
        Task AddReferenceAsync(Reference reference, IFormFile? logoFile);
        Task UpdateReferenceAsync(Reference reference, IFormFile? logoFile);
        Task DeleteReferenceAsync(int id);
    }
}
