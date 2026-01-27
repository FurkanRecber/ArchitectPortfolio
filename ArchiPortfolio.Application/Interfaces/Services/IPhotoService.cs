using Microsoft.AspNetCore.Http;

namespace ArchiPortfolio.Application.Interfaces.Services
{
    public interface IPhotoService
    {
        // Dosyayı yükler ve dosya yolunu (string) geri döner
        Task<string> UploadPhotoAsync(IFormFile photo, string folderName);
        
        // Resmi silmek istersek
        void DeletePhoto(string photoUrl);
    }
}