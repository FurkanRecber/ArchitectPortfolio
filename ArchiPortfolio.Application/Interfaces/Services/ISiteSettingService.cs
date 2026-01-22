using System.Threading.Tasks;
using ArchiPortfolio.Application.DTOs;
using ArchiPortfolio.Domain.Entities;

namespace ArchiPortfolio.Application.Interfaces.Services
{
    public interface ISiteSettingService
    {
        // Tek bir ayar olduğu için List dönmeye gerek yok
        Task<SiteSettingDto> GetSettingsAsync(string langCode);
        
        // Eğer hiç ayar yoksa varsayılan oluşturmak için
        Task CheckAndCreateDefaultAsync();
        
        Task UpdateSettingsAsync(SiteSetting setting);
    }
}