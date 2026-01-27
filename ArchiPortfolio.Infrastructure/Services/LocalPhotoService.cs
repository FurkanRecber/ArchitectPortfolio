using System;
using System.IO;
using System.Threading.Tasks;
using ArchiPortfolio.Application.Interfaces.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace ArchiPortfolio.Infrastructure.Services
{
    public class LocalPhotoService : IPhotoService
    {
        private readonly IWebHostEnvironment _env;

        public LocalPhotoService(IWebHostEnvironment env)
        {
            _env = env;
        }

        // Interface: Task<string> UploadPhotoAsync(IFormFile photo, string folderName)
        public async Task<string> UploadPhotoAsync(IFormFile photo, string folderName)
        {
            if (photo == null || photo.Length == 0)
                return null;

            // 1) uploads klasörünün fiziksel yolunu bul
            var uploadsFolderPath = Path.Combine(_env.WebRootPath, "uploads");

            // 2) Alt klasör belirlendiyse path'e ekle
            if (!string.IsNullOrEmpty(folderName))
            {
                uploadsFolderPath = Path.Combine(uploadsFolderPath, folderName);
            }

            // 3) Klasör yoksa oluştur
            if (!Directory.Exists(uploadsFolderPath))
            {
                Directory.CreateDirectory(uploadsFolderPath);
            }

            // 4) Unique dosya adı oluştur
            var uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(photo.FileName);

            // 5) Tam dosya yolu
            var filePath = Path.Combine(uploadsFolderPath, uniqueFileName);

            // 6) Kaydet
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await photo.CopyToAsync(stream);
            }

            // 7) URL döndür (örn: "uploads/projects/xyz.jpg")
            // Path.Combine kullanınca ters slash (\) gelebilir, web için (/) çevirelim
            var returnPath = Path.Combine("uploads", folderName ?? "", uniqueFileName).Replace("\\", "/");
            
            return returnPath;
        }

        // Interface: void DeletePhoto(string photoUrl)
        public void DeletePhoto(string photoUrl)
        {
            if (string.IsNullOrEmpty(photoUrl)) return;

            try 
            {
                var fileName = Path.GetFileName(photoUrl);
                string webRootPath = _env.WebRootPath ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
                var filePath = Path.Combine(webRootPath, "uploads", fileName);

                if (File.Exists(filePath))
                {
                    File.Delete(filePath);
                }
            }
            catch 
            {
                // Silme hatası önemsiz, devam et
            }
        }
    }
}