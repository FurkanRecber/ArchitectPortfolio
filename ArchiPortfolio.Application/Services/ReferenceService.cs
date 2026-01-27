using ArchiPortfolio.Application.Interfaces.Repositories;
using ArchiPortfolio.Application.Interfaces.Services;
using ArchiPortfolio.Domain.Entities;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace ArchiPortfolio.Application.Services
{
    public class ReferenceService : IReferenceService
    {
        private readonly IGenericRepository<Reference> _repository;
        private readonly IPhotoService _photoService;

        public ReferenceService(IGenericRepository<Reference> repository, IPhotoService photoService)
        {
            _repository = repository;
            _photoService = photoService;
        }

        public async Task<List<Reference>> GetAllReferencesAsync()
        {
            // Order by 'Order' property if relevant, otherwise default
            var list = await _repository.GetAllAsync();
            list.Sort((x, y) => x.Order.CompareTo(y.Order));
            return list;
        }

        public async Task<Reference> GetReferenceByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task AddReferenceAsync(Reference reference, IFormFile? logoFile)
        {
            if (logoFile != null)
            {
                reference.LogoUrl = await _photoService.UploadPhotoAsync(logoFile);
            }
            await _repository.AddAsync(reference);
            await _repository.SaveChangesAsync();
        }

        public async Task UpdateReferenceAsync(Reference reference, IFormFile? logoFile)
        {
            // Fetch existing to handle image replacement logic properly
            var existing = await _repository.GetByIdAsync(reference.Id);
            if (existing == null) throw new System.Exception("Reference not found");

            existing.Title = reference.Title;
            existing.Order = reference.Order;
            existing.IsActive = reference.IsActive;

            // Update Image if new one provided
            if (logoFile != null)
            {
                if (!string.IsNullOrEmpty(existing.LogoUrl))
                {
                    _photoService.DeletePhoto(existing.LogoUrl);
                }
                existing.LogoUrl = await _photoService.UploadPhotoAsync(logoFile);
            }

            _repository.Update(existing);
            await _repository.SaveChangesAsync();
        }

        public async Task DeleteReferenceAsync(int id)
        {
            var reference = await _repository.GetByIdAsync(id);
            if (reference != null)
            {
                if (!string.IsNullOrEmpty(reference.LogoUrl))
                {
                    _photoService.DeletePhoto(reference.LogoUrl);
                }
                _repository.Delete(reference);
                await _repository.SaveChangesAsync();
            }
        }
    }
}
