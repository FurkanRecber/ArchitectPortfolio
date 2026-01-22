using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using ArchiPortfolio.Application.Interfaces.Services;
using ArchiPortfolio.Domain.Entities;

namespace ArchiPortfolio.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServicesController : ControllerBase
    {
        private readonly IServiceService _serviceService;

        public ServicesController(IServiceService serviceService)
        {
            _serviceService = serviceService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string lang = "en")
        {
            var result = await _serviceService.GetAllServicesAsync(lang);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Add(Service service)
        {
            await _serviceService.AddServiceAsync(service);
            return Ok(new { message = "Hizmet eklendi", id = service.Id });
        }

        [HttpPut]
        public async Task<IActionResult> Update(Service service)
        {
            await _serviceService.UpdateServiceAsync(service);
            return Ok(new { message = "Hizmet güncellendi" });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _serviceService.DeleteServiceAsync(id);
            return Ok(new { message = "Hizmet silindi" });
        }
    }
}