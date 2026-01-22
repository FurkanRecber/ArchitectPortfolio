using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ArchiPortfolio.Application.DTOs;
using ArchiPortfolio.Application.Interfaces.Repositories;
using ArchiPortfolio.Application.Interfaces.Services;
using ArchiPortfolio.Domain.Entities;

namespace ArchiPortfolio.Application.Services
{
    public class SiteSettingService : ISiteSettingService
    {
        private readonly IGenericRepository<SiteSetting> _repository;
        private readonly IMapper _mapper;

        public SiteSettingService(IGenericRepository<SiteSetting> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<SiteSettingDto> GetSettingsAsync(string langCode)
        {
            var settingsList = await _repository.GetAllAsync();
            var setting = settingsList.FirstOrDefault();

            if (setting == null) return null;

            var dto = _mapper.Map<SiteSettingDto>(setting);

            if (langCode == "tr")
            {
                dto.HeroTitle = !string.IsNullOrEmpty(setting.HeroTitleTr) ? setting.HeroTitleTr : setting.HeroTitle;
                dto.AboutTitle = !string.IsNullOrEmpty(setting.AboutTitleTr) ? setting.AboutTitleTr : setting.AboutTitle;
                dto.AboutText = !string.IsNullOrEmpty(setting.AboutTextTr) ? setting.AboutTextTr : setting.AboutText;
                dto.Address = !string.IsNullOrEmpty(setting.AddressTr) ? setting.AddressTr : setting.Address;
            }

            return dto;
        }

        public async Task CheckAndCreateDefaultAsync()
        {
            var settings = await _repository.GetAllAsync();
            if (!settings.Any())
            {
                await _repository.AddAsync(new SiteSetting 
                { 
                    HeroTitle = "Welcome", 
                    Email = "info@archi.com" 
                    // Diğer alanlar boş kalabilir şimdilik
                });
                await _repository.SaveChangesAsync();
            }
        }

        public async Task UpdateSettingsAsync(SiteSetting setting)
        {
            _repository.Update(setting);
            await _repository.SaveChangesAsync();
        }
    }
}