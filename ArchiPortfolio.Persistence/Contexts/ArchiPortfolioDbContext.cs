using Microsoft.EntityFrameworkCore;
using ArchiPortfolio.Domain.Entities;
using ArchiPortfolio.Domain.Common;

namespace ArchiPortfolio.Persistence.Contexts
{
    public class ArchiPortfolioDbContext : DbContext
    {
        // Constructor: Ayarları dışarıdan (API'den) alabilmek için
        public ArchiPortfolioDbContext(DbContextOptions<ArchiPortfolioDbContext> options) : base(options)
        {
        }

        // Tablolarımız
        public DbSet<Project> Projects { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<ProjectImage> ProjectImages { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<TeamMember> TeamMembers { get; set; }
        public DbSet<Slider> Sliders { get; set; }
        public DbSet<Reference> References { get; set; } 
        public DbSet<SiteSetting> SiteSettings { get; set; }
        public DbSet<ContactMessage> ContactMessages { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }

        // Veritabanı oluşurken çalışacak ayarlar
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Tüm Entity'ler için ortak ayarlar (Örn: Soft Delete filtresi)
            // BaseEntity'den türeyenler üzerinde otomatik işlem yapılabilir.
            
            modelBuilder.Entity<Project>()
                .HasOne(p => p.Category)
                .WithMany(c => c.Projects)
                .HasForeignKey(p => p.CategoryId)
                .OnDelete(DeleteBehavior.Restrict); // Kategori silinirse projeler silinmesin, hata versin.

            base.OnModelCreating(modelBuilder);
        }
        
        // SaveChanges metodunu eziyoruz (Intercept ediyoruz)
        // Kayıt eklenirken veya güncellenirken tarihleri otomatik atamak için.
        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            foreach (var entry in ChangeTracker.Entries<BaseEntity>())
            {
                switch (entry.State)
                {
                    case EntityState.Added:
                        entry.Entity.CreatedDate = DateTime.UtcNow;
                        break;
                    case EntityState.Modified:
                        entry.Entity.UpdatedDate = DateTime.UtcNow;
                        break;
                }
            }
            return base.SaveChangesAsync(cancellationToken);
        }
    }
}