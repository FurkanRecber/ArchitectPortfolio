using ArchiPortfolio.Application.Interfaces.Services;
using ArchiPortfolio.Infrastructure.Services;
using Microsoft.Extensions.DependencyInjection;

namespace ArchiPortfolio.Infrastructure
{
    public static class InfrastructureServiceRegistration
    {
        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services)
        {
            // Program.cs'den taşınan resim servisi
            services.AddScoped<IPhotoService, LocalPhotoService>();

            return services;
        }
    }
}