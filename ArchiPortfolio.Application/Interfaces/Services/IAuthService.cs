using System.Threading.Tasks;
using ArchiPortfolio.Application.DTOs;
using ArchiPortfolio.Domain.Entities;

namespace ArchiPortfolio.Application.Interfaces.Services
{
    public interface IAuthService
    {
        // Artık Task dönüyor çünkü veritabanına gidecek
        Task<TokenDto> LoginAsync(LoginDto loginDto);
        
        // Token yenileme metodu
        Task<TokenDto> RefreshTokenAsync(string refreshToken);
        
        // İlk kullanıcıyı oluşturmak için (Register gibi)
        Task<User> RegisterAdminAsync(LoginDto loginDto);
    }
}