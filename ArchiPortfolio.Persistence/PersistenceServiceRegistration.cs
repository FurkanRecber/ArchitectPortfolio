using ArchiPortfolio.Application.Interfaces.Repositories;
using ArchiPortfolio.Persistence.Contexts;
using ArchiPortfolio.Persistence.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace ArchiPortfolio.Persistence
{
    public static class PersistenceServiceRegistration
    {
        public static IServiceCollection AddPersistenceServices(this IServiceCollection services, IConfiguration configuration)
        {
            // Program.cs'den aldığımız PostgreSQL bağlantısı
            services.AddDbContext<ArchiPortfolioDbContext>(options =>
                options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));

            // Generic Repository Kaydı
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));

            // Yeni eklediğimiz ContactMessage için Repository kaydı (Eğer özel repo oluşturduysak)
            // services.AddScoped<IContactMessageRepository, ContactMessageRepository>();

            return services;
        }
    }
}