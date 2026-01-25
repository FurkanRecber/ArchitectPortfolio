using Microsoft.AspNetCore.Http;

namespace ArchiPortfolio.Application.DTOs
{
    public class UpdateSiteSettingDto : SiteSettingDto
    {
        // Dosya yüklemeleri (CV kaldırıldı)
        public IFormFile? LogoImage { get; set; }
        public IFormFile? HeroImage { get; set; }
    }
}