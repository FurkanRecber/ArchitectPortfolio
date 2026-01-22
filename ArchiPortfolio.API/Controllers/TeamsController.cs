using Microsoft.AspNetCore.Mvc;
using ArchiPortfolio.Application.Interfaces.Services;
using ArchiPortfolio.Domain.Entities;

namespace ArchiPortfolio.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamsController : ControllerBase
    {
        private readonly ITeamService _teamService;
        private readonly IPhotoService _photoService;

        public TeamsController(ITeamService teamService, IPhotoService photoService)
        {
            _teamService = teamService;
            _photoService = photoService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string lang = "en")
        {
            var result = await _teamService.GetAllTeamMembersAsync(lang);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromForm] TeamMember teamMember, IFormFile? image)
        {
            if (image != null)
            {
                var imageUrl = await _photoService.UploadPhotoAsync(image);
                teamMember.ImageUrl = imageUrl;
            }

            await _teamService.AddTeamMemberAsync(teamMember);
            return Ok(new { message = "Ekip üyesi eklendi", id = teamMember.Id });
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] TeamMember teamMember)
        {
            await _teamService.UpdateTeamMemberAsync(teamMember);
            return Ok(new { message = "Ekip üyesi güncellendi" });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _teamService.DeleteTeamMemberAsync(id);
            return Ok(new { message = "Ekip üyesi silindi" });
        }
    }
}