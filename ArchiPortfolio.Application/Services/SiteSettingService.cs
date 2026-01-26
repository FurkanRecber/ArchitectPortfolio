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
        private readonly IPhotoService _photoService;

        public SiteSettingService(IGenericRepository<SiteSetting> repository, IMapper mapper, IPhotoService photoService)
        {
            _repository = repository;
            _mapper = mapper;
            _photoService = photoService;
        }

        public async Task<SiteSettingDto> GetSettingsAsync(string langCode)
        {
            var settingsList = await _repository.GetAllAsync();
            var setting = settingsList.FirstOrDefault();
            if (setting == null) return null;

            var dto = _mapper.Map<SiteSettingDto>(setting);

            // Frontend vitrini için dil çevirisi
            if (langCode == "tr")
            {
                dto.CopyrightText = !string.IsNullOrEmpty(setting.CopyrightTextTr) ? setting.CopyrightTextTr : setting.CopyrightText;
                dto.FooterDescription = !string.IsNullOrEmpty(setting.FooterDescriptionTr) ? setting.FooterDescriptionTr : setting.FooterDescription;
                
                dto.HeroTitle = !string.IsNullOrEmpty(setting.HeroTitleTr) ? setting.HeroTitleTr : setting.HeroTitle;
                dto.HeroSubtitle = !string.IsNullOrEmpty(setting.HeroSubtitleTr) ? setting.HeroSubtitleTr : setting.HeroSubtitle;
                dto.HeroButtonText = !string.IsNullOrEmpty(setting.HeroButtonTextTr) ? setting.HeroButtonTextTr : setting.HeroButtonText;

                dto.CtaTitle = !string.IsNullOrEmpty(setting.CtaTitleTr) ? setting.CtaTitleTr : setting.CtaTitle;
                dto.CtaDescription = !string.IsNullOrEmpty(setting.CtaDescriptionTr) ? setting.CtaDescriptionTr : setting.CtaDescription;
                dto.CtaButtonText = !string.IsNullOrEmpty(setting.CtaButtonTextTr) ? setting.CtaButtonTextTr : setting.CtaButtonText;

                dto.Address = !string.IsNullOrEmpty(setting.AddressTr) ? setting.AddressTr : setting.Address;
                dto.MetaKeywords = !string.IsNullOrEmpty(setting.MetaKeywordsTr) ? setting.MetaKeywordsTr : setting.MetaKeywords;
                
                dto.PhilosophySectionTitle = !string.IsNullOrEmpty(setting.PhilosophySectionTitleTr) ? setting.PhilosophySectionTitleTr : setting.PhilosophySectionTitle;
        
                dto.Philo1Title = !string.IsNullOrEmpty(setting.Philo1TitleTr) ? setting.Philo1TitleTr : setting.Philo1Title;
                dto.Philo1Desc = !string.IsNullOrEmpty(setting.Philo1DescTr) ? setting.Philo1DescTr : setting.Philo1Desc;

                dto.Philo2Title = !string.IsNullOrEmpty(setting.Philo2TitleTr) ? setting.Philo2TitleTr : setting.Philo2Title;
                dto.Philo2Desc = !string.IsNullOrEmpty(setting.Philo2DescTr) ? setting.Philo2DescTr : setting.Philo2Desc;

                dto.Philo3Title = !string.IsNullOrEmpty(setting.Philo3TitleTr) ? setting.Philo3TitleTr : setting.Philo3Title;
                dto.Philo3Desc = !string.IsNullOrEmpty(setting.Philo3DescTr) ? setting.Philo3DescTr : setting.Philo3Desc;
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
                    SiteTitle = "Vivere Design",
                    HeroTitle = "Architecture for Future", 
                    Email = "info@vivere.design" 
                });
                await _repository.SaveChangesAsync();
            }
        }

        public async Task UpdateSettingsAsync(UpdateSiteSettingDto dto)
        {
            var settingsList = await _repository.GetAllAsync();
            var setting = settingsList.FirstOrDefault();
            
            if (setting == null)
            {
                await CheckAndCreateDefaultAsync();
                settingsList = await _repository.GetAllAsync();
                setting = settingsList.First();
            }

            // 1. Text Alanlarını Güncelle
            _mapper.Map(dto, setting);

            // 2. Dosya Yüklemeleri (CV kaldırıldı)
            if (dto.LogoImage != null)
            {
                // Eski logoyu silme işlemi opsiyonel, hata vermemesi için şimdilik koymuyorum.
                setting.LogoUrl = await _photoService.UploadPhotoAsync(dto.LogoImage);
            }

            if (dto.HeroImage != null)
            {
                setting.HeroImageUrl = await _photoService.UploadPhotoAsync(dto.HeroImage);
            }
            if (dto.AboutImage != null)
            {
                if (!string.IsNullOrEmpty(setting.AboutImageUrl)) _photoService.DeletePhoto(setting.AboutImageUrl);
                setting.AboutImageUrl = await _photoService.UploadPhotoAsync(dto.AboutImage);
            }
            
            if (dto.Philo1Icon != null) {
                if (!string.IsNullOrEmpty(setting.Philo1IconUrl)) _photoService.DeletePhoto(setting.Philo1IconUrl);
                setting.Philo1IconUrl = await _photoService.UploadPhotoAsync(dto.Philo1Icon);
            }
            // İkon 2
            if (dto.Philo2Icon != null) {
                if (!string.IsNullOrEmpty(setting.Philo2IconUrl)) _photoService.DeletePhoto(setting.Philo2IconUrl);
                setting.Philo2IconUrl = await _photoService.UploadPhotoAsync(dto.Philo2Icon);
            }
            // İkon 3
            if (dto.Philo3Icon != null)
            {
                if (!string.IsNullOrEmpty(setting.Philo3IconUrl)) _photoService.DeletePhoto(setting.Philo3IconUrl);
                setting.Philo3IconUrl = await _photoService.UploadPhotoAsync(dto.Philo3Icon);
            }

            _repository.Update(setting);
            await _repository.SaveChangesAsync();
        }
    }
}