using ArchiPortfolio.Domain.Common;

namespace ArchiPortfolio.Domain.Entities
{
    public class Project : BaseEntity
    {
        // İngilizce (Varsayılan)
        public string Title { get; set; }
        public string Description { get; set; }
        public string Details { get; set; }
        public string Client { get; set; }
        public string Location { get; set; }
        public string ProjectTeam { get; set; }

        // Türkçe (Yeni Eklenenler)
        public string TitleTr { get; set; }
        public string DescriptionTr { get; set; }
        public string DetailsTr { get; set; }
        public string ClientTr { get; set; }      // Müşteri adı değişmez ama "Eczacıbaşı Holding" Türkçe karakter içerebilir.
        public string LocationTr { get; set; }    // "London" vs "Londra"
        public string ProjectTeamTr { get; set; } // Ünvanlar değişebilir

        // Ortak Alanlar (Değişmez)
        public string Slug { get; set; }
        public string CoverImageUrl { get; set; }
        public string ProjectYear { get; set; }
        public string Area { get; set; }
        public string Status { get; set; } // "Completed" statik bir veri, bunu frontend çevirebilir veya buraya StatusTr eklenebilir.
        public string PressKitUrl { get; set; }
        public bool IsFeatured { get; set; }
        public DateTime PublishDate { get; set; }

        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public ICollection<ProjectImage> ProjectImages { get; set; }
    }
}