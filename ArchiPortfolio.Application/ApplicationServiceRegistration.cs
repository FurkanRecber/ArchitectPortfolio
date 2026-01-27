using ArchiPortfolio.Application.Interfaces.Services;
using ArchiPortfolio.Application.Services;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace ArchiPortfolio.Application
{
    public static class ApplicationServiceRegistration
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            // AutoMapper
            services.AddAutoMapper(Assembly.GetExecutingAssembly());

            // Mevcut Servislerin (Program.cs'den alındı)
            services.AddScoped<IProjectService, ProjectService>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<IServiceService, ServiceService>();
            services.AddScoped<ITeamService, TeamService>();
            services.AddScoped<ISiteSettingService, SiteSettingService>();
            services.AddScoped<IAuthService, AuthService>();

            // YENİ: ContactMessage Servisi (Eklemeyi unutmuyoruz)
            services.AddScoped<IContactMessageService, ContactMessageService>();
            services.AddScoped<IReferenceService, ReferenceService>();

            return services;
        }
    }
}