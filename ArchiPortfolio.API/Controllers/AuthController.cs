using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using ArchiPortfolio.Application.DTOs;
using ArchiPortfolio.Application.Interfaces.Services;

namespace ArchiPortfolio.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        // 1. GİRİŞ YAP (Login)
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            var result = await _authService.LoginAsync(loginDto);
            
            if (result == null)
                return Unauthorized(new { message = "Kullanıcı adı veya şifre hatalı." });

            return Ok(result);
        }

        // 2. TOKEN YENİLE (Refresh)
        // Access Token süresi bitince buraya istek atılacak
        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] string refreshToken)
        {
            var result = await _authService.RefreshTokenAsync(refreshToken);
            
            if (result == null)
                return BadRequest(new { message = "Geçersiz veya süresi dolmuş token." });

            return Ok(result);
        }

        /* 3. İLK KAYIT (Sadece ilk admini oluşturmak için kullanıp sileceğiz)
        [HttpPost("register-admin")]
        public async Task<IActionResult> Register([FromBody] LoginDto loginDto)
        {
            var user = await _authService.RegisterAdminAsync(loginDto);
            return Ok(new { message = "Admin oluşturuldu", username = user.Username });
        }*/
    }
}