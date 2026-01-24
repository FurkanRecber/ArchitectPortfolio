using ArchiPortfolio.Application;
using ArchiPortfolio.Persistence;
using ArchiPortfolio.Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// 1. KATMAN SERVISLERININ KAYDI (EXTENSION METOTLAR)
// -------------------------------------------------------------------------
builder.Services.AddPersistenceServices(builder.Configuration); // DbContext & Repos
builder.Services.AddInfrastructureServices();                   // PhotoService
builder.Services.AddApplicationServices();                      // Business Services & Mapper


// 2. JWT AUTHENTICATION AYARLARI (API Katmanında kalması uygundur)
// -------------------------------------------------------------------------
// 2. JWT AUTHENTICATION AYARLARI
// -------------------------------------------------------------------------
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            
            // AppSettings.json'daki "JwtSettings" başlığına göre güncelledik:
            ValidIssuer = builder.Configuration["JwtSettings:Issuer"],
            ValidAudience = builder.Configuration["JwtSettings:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtSettings:Key"])),
            
            ClockSkew = TimeSpan.Zero
        };
    });

// 3. STANDART API AYARLARI
// -------------------------------------------------------------------------
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// Swagger Ayarları (JWT desteği ile)
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "ArchiPortfolio API", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Example: \"Bearer {token}\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                },
                Scheme = "oauth2",
                Name = "Bearer",
                In = ParameterLocation.Header
            },
            new List<string>()
        }
    });
});

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        b => b.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin());
});

var app = builder.Build();

// 4. MIDDLEWARE PIPELINE
// -------------------------------------------------------------------------
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseStaticFiles(); // Resimlerin görüntülenmesi için
app.UseCors("AllowAll");

app.UseHttpsRedirection();

app.UseAuthentication(); // Önce Auth
app.UseAuthorization();  // Sonra Yetki

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    try
    {
        // Yazdığımız SeedData sınıfını çalıştır
        await ArchiPortfolio.Persistence.SeedData.InitializeAsync(scope.ServiceProvider);
        Console.WriteLine("--> Veritabanı güncellendi ve Admin bilgileri kontrol edildi.");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"--> Veritabanı Seed Hatası: {ex.Message}");
    }
}

app.Run();