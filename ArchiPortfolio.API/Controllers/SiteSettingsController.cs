using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using ArchiPortfolio.Application.DTOs;
using ArchiPortfolio.Application.Interfaces.Services;

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
            await _service.CheckAndCreateDefaultAsync();
            var result = await _service.GetSettingsAsync(lang);
            return Ok(result);
        }

        // DEĞİŞİKLİK: [FromForm] ve UpdateSiteSettingDto
        [HttpPut]
        public async Task<IActionResult> Update([FromForm] UpdateSiteSettingDto settingDto)
        {
            await _service.UpdateSettingsAsync(settingDto);
            return Ok(new { message = "Site ayarları başarıyla güncellendi." });
        }
    }
}