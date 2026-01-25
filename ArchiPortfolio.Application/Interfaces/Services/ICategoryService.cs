using System.Collections.Generic;
using System.Threading.Tasks;
using ArchiPortfolio.Application.DTOs;

namespace ArchiPortfolio.Application.Interfaces.Services
{
    public interface ICategoryService
    {
        Task<List<CategoryDto>> GetAllCategoriesAsync(string langCode);
        Task<CategoryDto> GetCategoryByIdAsync(int id);
        
        // Parametreler CreateCategoryDto oldu
        Task AddCategoryAsync(CreateCategoryDto createDto);
        Task UpdateCategoryAsync(CreateCategoryDto updateDto);
        
        Task DeleteCategoryAsync(int id);
    }
}