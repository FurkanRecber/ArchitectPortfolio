using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using ArchiPortfolio.Application.Interfaces.Services;
using ArchiPortfolio.Domain.Entities;

namespace ArchiPortfolio.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SiteSettingsController : ControllerBase
    {
        private readonly ISiteSettingService _service;

        public SiteSettingsController(ISiteSettingService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] string lang = "en")
        {
            // Önce ayar var mı diye bak, yoksa oluştur (Seed mantığı)
            await _service.CheckAndCreateDefaultAsync();
            
            var result = await _service.GetSettingsAsync(lang);
            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] SiteSetting setting)
        {
            await _service.UpdateSettingsAsync(setting);
            return Ok(new { message = "Ayarlar güncellendi." });
        }
    }
}