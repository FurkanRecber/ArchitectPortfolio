using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ArchiPortfolio.Application.DTOs;
using ArchiPortfolio.Application.Interfaces.Repositories;
using ArchiPortfolio.Application.Interfaces.Services;
using ArchiPortfolio.Domain.Entities;

namespace ArchiPortfolio.Application.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly IGenericRepository<Category> _repository;
        private readonly IMapper _mapper;

        public CategoryService(IGenericRepository<Category> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<List<CategoryDto>> GetAllCategoriesAsync(string langCode)
        {
            var categories = await _repository.GetAllAsync();
            var dtos = new List<CategoryDto>();

            foreach (var cat in categories)
            {
                var dto = _mapper.Map<CategoryDto>(cat);
                // Dil Kontrolü
                if (langCode == "tr")
                {
                    dto.Name = !string.IsNullOrEmpty(cat.NameTr) ? cat.NameTr : cat.Name;
                }
                dtos.Add(dto);
            }
            return dtos;
        }

        public async Task<CategoryDto> GetCategoryByIdAsync(int id, string langCode)
        {
            var cat = await _repository.GetByIdAsync(id);
            if (cat == null) return null;

            var dto = _mapper.Map<CategoryDto>(cat);
            if (langCode == "tr")
            {
                dto.Name = !string.IsNullOrEmpty(cat.NameTr) ? cat.NameTr : cat.Name;
            }
            return dto;
        }

        public async Task AddCategoryAsync(Category category)
        {
            await _repository.AddAsync(category);
            await _repository.SaveChangesAsync();
        }

        public async Task UpdateCategoryAsync(Category category)
        {
            _repository.Update(category);
            await _repository.SaveChangesAsync();
        }

        public async Task DeleteCategoryAsync(int id)
        {
            var category = await _repository.GetByIdAsync(id);
            if (category != null)
            {
                _repository.Delete(category);
                await _repository.SaveChangesAsync();
            }
        }
    }
}