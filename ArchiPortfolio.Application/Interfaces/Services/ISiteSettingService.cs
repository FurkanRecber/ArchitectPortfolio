using System.Threading.Tasks;
using ArchiPortfolio.Application.DTOs;

namespace ArchiPortfolio.Application.Interfaces.Services
{
    public interface ISiteSettingService
    {
        Task<SiteSettingDto> GetSettingsAsync(string langCode);
        Task CheckAndCreateDefaultAsync();
        // Parametre değişti: UpdateSiteSettingDto
        Task UpdateSettingsAsync(UpdateSiteSettingDto settingsDto); 
    }
}