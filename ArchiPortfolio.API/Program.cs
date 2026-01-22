using Microsoft.EntityFrameworkCore;
using ArchiPortfolio.Persistence.Contexts;
using ArchiPortfolio.Application.Interfaces.Repositories;
using ArchiPortfolio.Persistence.Repositories;
using ArchiPortfolio.Application.Mappings;
using ArchiPortfolio.Application.Interfaces.Services;
using ArchiPortfolio.Application.Services;
using ArchiPortfolio.Infrastructure.Services; 
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// --- 1. SERVİS KAYITLARI (Dependency Injection) ---

// Controller Desteği (API'nin çalışması için ŞART)
builder.Services.AddControllers();

// API Explorer (Swagger'ın endpointleri bulması için)
builder.Services.AddEndpointsApiExplorer();

// Swagger Jeneratörü
builder.Services.AddSwaggerGen();

// Veritabanı Bağlantısı
builder.Services.AddDbContext<ArchiPortfolioDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// AutoMapper
builder.Services.AddAutoMapper(typeof(GeneralMapping).Assembly);

builder.Services.AddScoped<IPhotoService, LocalPhotoService>();

// 1. Auth Servisini Kaydet
builder.Services.AddScoped<ISiteSettingService, SiteSettingService>();
builder.Services.AddScoped<IAuthService, AuthService>();

// 2. JWT Ayarları
var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var key = Encoding.ASCII.GetBytes(jwtSettings["Key"]);

builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false;
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidIssuer = jwtSettings["Issuer"],
            ValidAudience = jwtSettings["Audience"]
        };
    });

// Repository & Services (Application Katmanı)
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped<IProjectService, ProjectService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IServiceService, ServiceService>();
builder.Services.AddScoped<ITeamService, TeamService>();
builder.Services.AddScoped<ISiteSettingService, SiteSettingService>();

// DİKKAT: IPhotoService (Infrastructure) henüz yazılmadığı için buraya eklemiyoruz.

var app = builder.Build();

// --- 2. MIDDLEWARE (Uygulama Hattı) ---

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseAuthentication();
app.UseAuthorization();

// Controller'ları Eşleştir (İstekleri doğru yere yönlendirir)
app.MapControllers();

app.Run();