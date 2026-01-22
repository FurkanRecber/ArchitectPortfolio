using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using ArchiPortfolio.Application.DTOs;
using ArchiPortfolio.Application.Interfaces.Repositories;
using ArchiPortfolio.Application.Interfaces.Services;
using ArchiPortfolio.Domain.Entities;

namespace ArchiPortfolio.Application.Services
{
    public class ServiceService : IServiceService
    {
        private readonly IGenericRepository<Service> _repository;
        private readonly IMapper _mapper;

        public ServiceService(IGenericRepository<Service> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<List<ServiceDto>> GetAllServicesAsync(string langCode)
        {
            var services = await _repository.GetAllAsync();
            var dtos = new List<ServiceDto>();

            foreach (var item in services)
            {
                var dto = _mapper.Map<ServiceDto>(item);
                if (langCode == "tr")
                {
                    dto.Title = !string.IsNullOrEmpty(item.TitleTr) ? item.TitleTr : item.Title;
                    dto.Description = !string.IsNullOrEmpty(item.DescriptionTr) ? item.DescriptionTr : item.Description;
                }
                dtos.Add(dto);
            }
            return dtos;
        }

        public async Task AddServiceAsync(Service service)
        {
            await _repository.AddAsync(service);
            await _repository.SaveChangesAsync();
        }

        public async Task UpdateServiceAsync(Service service)
        {
            _repository.Update(service);
            await _repository.SaveChangesAsync();
        }

        public async Task DeleteServiceAsync(int id)
        {
            var service = await _repository.GetByIdAsync(id);
            if (service != null)
            {
                _repository.Delete(service);
                await _repository.SaveChangesAsync();
            }
        }
    }
}