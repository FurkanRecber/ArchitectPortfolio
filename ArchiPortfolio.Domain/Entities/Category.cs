using ArchiPortfolio.Domain.Common;

namespace ArchiPortfolio.Domain.Entities
{
    public class Category : BaseEntity
    {
        public string Name { get; set; }
        public string NameTr { get; set; } // Türkçe İsim
        
        // --- YENİ EKLENEN ALANLAR ---
        public string Description { get; set; }
        public string DescriptionTr { get; set; }
        public int IconId { get; set; } // Frontend'deki ikon listesinin ID'si (0, 1, 2...)
        public string CoverImageUrl { get; set; } // Kategori resmi
        // ----------------------------

        public ICollection<Project> Projects { get; set; }
    }
}