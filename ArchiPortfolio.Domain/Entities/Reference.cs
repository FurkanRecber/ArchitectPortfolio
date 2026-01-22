using ArchiPortfolio.Domain.Common;

namespace ArchiPortfolio.Domain.Entities
{
    public class Reference : BaseEntity
    {
        public string Title { get; set; }       // Firma Adı (Örn: Eczacıbaşı)
        public string LogoUrl { get; set; }     // Firma Logosu (.png/.svg)
        public int Order { get; set; }          // Sıralama (Logoların sırası önemli olabilir)
        public bool IsActive { get; set; } = true;
    }
}