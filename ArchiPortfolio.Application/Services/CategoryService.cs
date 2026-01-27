using System.Collections.Generic;
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
        private readonly IPhotoService _photoService;

        public CategoryService(IGenericRepository<Category> repository, IMapper mapper, IPhotoService photoService)
        {
            _repository = repository;
            _mapper = mapper;
            _photoService = photoService;
        }

        public async Task<List<CategoryDto>> GetAllCategoriesAsync(string langCode)
        {
            var categories = await _repository.GetAllAsync(x => x.Projects); 
    
            var dtos = new List<CategoryDto>();

            foreach (var cat in categories)
            {
                var dto = _mapper.Map<CategoryDto>(cat);
                if (langCode == "tr")
                {
                    dto.Name = !string.IsNullOrEmpty(cat.NameTr) ? cat.NameTr : cat.Name;
                    dto.Description = !string.IsNullOrEmpty(cat.DescriptionTr) ? cat.DescriptionTr : cat.Description;
                }
                dtos.Add(dto);
            }
            return dtos;
        }

        public async Task<CategoryDto> GetCategoryByIdAsync(int id)
        {
            var cat = await _repository.GetByIdAsync(id);
            if (cat == null) return null;
            return _mapper.Map<CategoryDto>(cat);
        }

        public async Task AddCategoryAsync(CreateCategoryDto createDto)
        {
            var category = _mapper.Map<Category>(createDto);

            // DÜZELTME BURADA:
            if (createDto.CoverImage != null)
            {
                // UploadPhotoAsync metodu direkt string döner (URL)
                var photoUrl = await _photoService.UploadPhotoAsync(createDto.CoverImage, "categories");
                category.CoverImageUrl = photoUrl;
            }

            await _repository.AddAsync(category);
            await _repository.SaveChangesAsync();
        }

        public async Task UpdateCategoryAsync(CreateCategoryDto updateDto)
        {
            if (!updateDto.Id.HasValue) return;

            var category = await _repository.GetByIdAsync(updateDto.Id.Value);
            if (category == null) return;

            // Alanları güncelle
            category.Name = updateDto.Name;
            category.NameTr = updateDto.NameTr;
            category.Description = updateDto.Description;
            category.DescriptionTr = updateDto.DescriptionTr;
            category.IconId = updateDto.IconId;

            // DÜZELTME BURADA:
            if (updateDto.CoverImage != null)
            {
                // Eski resmi silmek istersen:
                if (!string.IsNullOrEmpty(category.CoverImageUrl))
                {
                    _photoService.DeletePhoto(category.CoverImageUrl);
                }

                var photoUrl = await _photoService.UploadPhotoAsync(updateDto.CoverImage, "categories");
                category.CoverImageUrl = photoUrl;
            }

            _repository.Update(category);
            await _repository.SaveChangesAsync();
        }

        public async Task DeleteCategoryAsync(int id)
        {
            // Kategoriyi çekerken içindeki Projeleri de (Projects) dahil et
            var category = await _repository.GetByIdAsync(id, x => x.Projects);
    
            if (category != null)
            {
                // KONTROL: Eğer kategoriye bağlı proje varsa silme, hata fırlat.
                if (category.Projects != null && category.Projects.Any())
                {
                    throw new System.InvalidOperationException("Bu kategoriyi silemezsiniz çünkü içinde kayıtlı projeler var. Önce projeleri silmeli veya başka bir kategoriye taşımalısınız.");
                }

                // Resim varsa temizle
                if (!string.IsNullOrEmpty(category.CoverImageUrl))
                {
                    _photoService.DeletePhoto(category.CoverImageUrl);
                }

                _repository.Delete(category);
                await _repository.SaveChangesAsync();
            }
        }
    }
}