using System.Collections.Generic;
using System.Threading.Tasks;
using ArchiPortfolio.Application.DTOs;
using ArchiPortfolio.Domain.Entities;

namespace ArchiPortfolio.Application.Interfaces.Services
{
    public interface ICategoryService
    {
        Task<List<CategoryDto>> GetAllCategoriesAsync(string langCode);
        Task<CategoryDto> GetCategoryByIdAsync(int id, string langCode);
        
        Task AddCategoryAsync(Category category);
        Task UpdateCategoryAsync(Category category);
        Task DeleteCategoryAsync(int id);
    }
}