using ArchiPortfolio.Domain.Common;

namespace ArchiPortfolio.Domain.Entities
{
    public class SiteSetting : BaseEntity
    {
        // --- 1. GENERAL ---
        public string SiteTitle { get; set; }
        public string LogoUrl { get; set; }
        
        public string CopyrightText { get; set; }
        public string CopyrightTextTr { get; set; }
        
        public string FooterDescription { get; set; }
        public string FooterDescriptionTr { get; set; }

        // --- 2. HERO SECTION ---
        public string HeroTitle { get; set; }       
        public string HeroTitleTr { get; set; }
        
        public string HeroSubtitle { get; set; }    
        public string HeroSubtitleTr { get; set; }
        
        public string HeroButtonText { get; set; }
        public string HeroButtonTextTr { get; set; }
        
        public string HeroImageUrl { get; set; }

        // --- 3. CTA SECTION ---
        public string CtaTitle { get; set; }
        public string CtaTitleTr { get; set; }
        
        public string CtaDescription { get; set; }
        public string CtaDescriptionTr { get; set; }
        
        public string CtaButtonText { get; set; }
        public string CtaButtonTextTr { get; set; }

        // --- 4. STUDIO METRICS --- (CV Kaldırıldı)
        public string Metric1Title { get; set; } // Örn: "Years Active"
        public string Metric1TitleTr { get; set; }
        public string Metric1Value { get; set; } // Örn: "12"

        public string Metric2Title { get; set; } // Örn: "Projects"
        public string Metric2TitleTr { get; set; }
        public string Metric2Value { get; set; } // Örn: "140+"

        public string Metric3Title { get; set; } // Örn: "Awards"
        public string Metric3TitleTr { get; set; }
        public string Metric3Value { get; set; } // Örn: "25"
        
        public string AboutTitle { get; set; }
        public string AboutTitleTr { get; set; }
        public string AboutDescription { get; set; }
        public string AboutDescriptionTr { get; set; }
        public string PhilosophyIconUrl { get; set; }
        public string AboutImageUrl { get; set; } // Yanındaki Resim
        
        public string PhilosophyTitle { get; set; }
        public string PhilosophyTitleTr { get; set; }
        public string PhilosophyDescription { get; set; }
        public string PhilosophyDescriptionTr { get; set; }
        
        // Showreel videosu kalsın
        public string ShowreelUrl { get; set; }

        // --- 5. CONTACT ---
        public string Email { get; set; }
        public string Phone { get; set; }
        
        public string Address { get; set; }
        public string AddressTr { get; set; }
        
        public string GoogleMapEmbedCode { get; set; }

        // Sosyal Medya (Behance Kaldırıldı)
        public string FacebookUrl { get; set; }
        public string InstagramUrl { get; set; }
        public string LinkedinUrl { get; set; }
        public string YoutubeUrl { get; set; }

        // --- 6. SEO & ANALYTICS --- (Eklendi)
        public string GoogleAnalyticsId { get; set; }
        public string GoogleTagManagerId { get; set; }
        public string HeadScripts { get; set; }
        
        public string MetaKeywords { get; set; }
        public string MetaKeywordsTr { get; set; }
        
        public string RobotsTxt { get; set; }
    }
}