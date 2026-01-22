using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using ArchiPortfolio.Application.Interfaces.Services;

namespace ArchiPortfolio.Infrastructure.Services
{
    public class LocalPhotoService : IPhotoService
    {
        private readonly IWebHostEnvironment _env;

        public LocalPhotoService(IWebHostEnvironment env)
        {
            _env = env;
        }

        public async Task<string> UploadPhotoAsync(IFormFile photo)
        {
            if (photo == null || photo.Length == 0)
                return null;

            // 1. Klasör: wwwroot/uploads
            string uploadPath = Path.Combine(_env.WebRootPath, "uploads");

            if (!Directory.Exists(uploadPath))
                Directory.CreateDirectory(uploadPath);

            // 2. Benzersiz İsim: guid + .jpg
            string fileName = Guid.NewGuid().ToString() + Path.GetExtension(photo.FileName);
            string fullPath = Path.Combine(uploadPath, fileName);

            // 3. Kaydet
            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                await photo.CopyToAsync(stream);
            }

            // 4. URL Dön: /uploads/resim.jpg
            return "/uploads/" + fileName;
        }

        public void DeletePhoto(string photoUrl)
        {
            if (string.IsNullOrEmpty(photoUrl)) return;

            string filePath = Path.Combine(_env.WebRootPath, photoUrl.TrimStart('/'));

            if (File.Exists(filePath))
            {
                File.Delete(filePath);
            }
        }
    }
}