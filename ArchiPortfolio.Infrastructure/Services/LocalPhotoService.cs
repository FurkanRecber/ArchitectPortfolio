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

        // Interface: Task<string> UploadPhotoAsync(IFormFile photo)
        public async Task<string> UploadPhotoAsync(IFormFile photo)
        {
            if (photo == null || photo.Length == 0) return null;

            // 1. Dosya ismini oluştur
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(photo.FileName);
            
            // 2. Klasör yolunu belirle (Garanti yöntem)
            // WebRootPath bazen null gelebilir, o yüzden manuel kontrol ekliyoruz
            string webRootPath = _env.WebRootPath ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
            var uploadPath = Path.Combine(webRootPath, "uploads");
            
            // Klasör yoksa oluştur
            if (!Directory.Exists(uploadPath))
                Directory.CreateDirectory(uploadPath);

            // 3. Dosyayı kaydet
            var filePath = Path.Combine(uploadPath, fileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await photo.CopyToAsync(stream);
            }

            // 4. Web yolunu döndür
            return $"/uploads/{fileName}";
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