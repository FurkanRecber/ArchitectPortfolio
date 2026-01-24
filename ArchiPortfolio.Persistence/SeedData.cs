using ArchiPortfolio.Application.Utilities;
using ArchiPortfolio.Domain.Entities;
using ArchiPortfolio.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace ArchiPortfolio.Persistence
{
    public static class SeedData
    {
        public static async Task InitializeAsync(IServiceProvider serviceProvider)
        {
            using var scope = serviceProvider.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<ArchiPortfolioDbContext>();
            var configuration = scope.ServiceProvider.GetRequiredService<IConfiguration>();

            // 1. Veritabanı yoksa oluştur (Migrationları uygula)
            await context.Database.MigrateAsync();

            // 2. AppSettings -> JwtSettings altından bilgileri oku
            // Senin json yapına göre anahtarları güncelledim:
            var adminEmail = configuration["JwtSettings:AdminUsername"] ?? "admin@gmail.com";
            var adminPassword = configuration["JwtSettings:AdminPassword"] ?? "123456";
            
            // İsimler json'da olmadığı için varsayılan atıyoruz
            var adminFirst = "System"; 
            var adminLast = "Admin";

            // 3. Admin var mı kontrol et
            var adminUser = await context.Users.FirstOrDefaultAsync(u => u.Email == adminEmail);

            // Şifreyi hashle
            byte[] passwordHash, passwordSalt;
            HashingHelper.CreatePasswordHash(adminPassword, out passwordHash, out passwordSalt);

            if (adminUser == null)
            {
                // Yoksa OLUŞTUR
                adminUser = new User
                {
                    Email = adminEmail,
                    FirstName = adminFirst,
                    LastName = adminLast,
                    Role = "Admin",
                    Status = true,
                    PasswordHash = passwordHash,
                    PasswordSalt = passwordSalt,
                    CreatedDate = DateTime.UtcNow,
                    Username = adminEmail // Username alanı varsa
                };
                await context.Users.AddAsync(adminUser);
            }
            else
            {
                // Varsa GÜNCELLE (Şifreyi json'daki yeni şifreyle değiştir)
                adminUser.PasswordHash = passwordHash;
                adminUser.PasswordSalt = passwordSalt;
                // Şifreyi değiştirdiğimizde UpdatedDate'i de güncelleyelim
                adminUser.UpdatedDate = DateTime.UtcNow;
                
                context.Users.Update(adminUser);
            }

            await context.SaveChangesAsync();
        }
    }
}