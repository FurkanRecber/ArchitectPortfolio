using ArchiPortfolio.Domain.Common;

namespace ArchiPortfolio.Domain.Entities
{
    public class SiteSetting : BaseEntity
    {
        // İngilizce
        public string HeroTitle { get; set; }
        public string AboutTitle { get; set; }
        public string AboutText { get; set; }
        public string Address { get; set; }

        // Türkçe
        public string HeroTitleTr { get; set; }
        public string AboutTitleTr { get; set; }
        public string AboutTextTr { get; set; }
        public string AddressTr { get; set; }

        // Değişmeyenler
        public string Email { get; set; }
        public string Phone { get; set; }
        public string GoogleMapEmbedCode { get; set; }
        public string FacebookUrl { get; set; }
        public string InstagramUrl { get; set; }
        public string LinkedinUrl { get; set; }
        public string YoutubeUrl { get; set; }
    }
}