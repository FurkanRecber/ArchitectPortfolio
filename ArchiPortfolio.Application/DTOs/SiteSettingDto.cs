namespace ArchiPortfolio.Application.DTOs
{
    public class SiteSettingDto
    {
        public int Id { get; set; }

        // --- 1. GENERAL & BRAND ---
        // --- 1. GENERAL & BRAND ---
        // DİKKAT: Burada IFormFile YOK, string URL VAR.
        public string? LogoUrl { get; set; } 
        public string? SiteTitle { get; set; }
        public string? CopyrightText { get; set; }
        public string? CopyrightTextTr { get; set; }
        public string? FooterDescription { get; set; }
        public string? FooterDescriptionTr { get; set; }
        
        // --- 2. HERO SECTION ---
        public string? HeroImageUrl { get; set; } // URL
        public string? HeroTitle { get; set; }
        public string? HeroTitleTr { get; set; }
        public string? HeroSubtitle { get; set; }
        public string? HeroSubtitleTr { get; set; }
        public string? HeroButtonText { get; set; }
        public string? HeroButtonTextTr { get; set; }

        // --- 3. CTA SECTION ---
        public string? CtaTitle { get; set; }
        public string? CtaTitleTr { get; set; }
        public string? CtaDescription { get; set; }
        public string? CtaDescriptionTr { get; set; }
        public string? CtaButtonText { get; set; }
        public string? CtaButtonTextTr { get; set; }

        // --- 4. STUDIO SECTION ---
        
        // A. Metrikler
        public string? Metric1Title { get; set; }
        public string? Metric1TitleTr { get; set; }
        public string? Metric1Value { get; set; }

        public string? Metric2Title { get; set; }
        public string? Metric2TitleTr { get; set; }
        public string? Metric2Value { get; set; }

        public string? Metric3Title { get; set; }
        public string? Metric3TitleTr { get; set; }
        public string? Metric3Value { get; set; }

        // B. Hakkımızda (About Us)
        public string? AboutTitle { get; set; }
        public string? AboutTitleTr { get; set; }
        public string? AboutDescription { get; set; }
        public string? AboutDescriptionTr { get; set; }
        public string? AboutImageUrl { get; set; } // URL

        // C. Felsefe (Philosophy)
        public string? PhilosophySectionTitle { get; set; }
        public string? PhilosophySectionTitleTr { get; set; }

        public string? Philo1Title { get; set; }
        public string? Philo1TitleTr { get; set; }
        public string? Philo1Desc { get; set; }
        public string? Philo1DescTr { get; set; }
        public string? Philo1IconUrl { get; set; } // URL

        public string? Philo2Title { get; set; }
        public string? Philo2TitleTr { get; set; }
        public string? Philo2Desc { get; set; }
        public string? Philo2DescTr { get; set; }
        public string? Philo2IconUrl { get; set; } // URL

        public string? Philo3Title { get; set; }
        public string? Philo3TitleTr { get; set; }
        public string? Philo3Desc { get; set; }
        public string? Philo3DescTr { get; set; }
        public string? Philo3IconUrl { get; set; }

        // D. Video
        public string? ShowreelUrl { get; set; }
        public int WebSiteVisitorCount { get; set; }

        // --- 5. CONTACT INFO ---
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Address { get; set; }
        public string? AddressTr { get; set; }
        public string? GoogleMapEmbedCode { get; set; }

        // Sosyal Medya
        public string? FacebookUrl { get; set; }
        public string? InstagramUrl { get; set; }
        public string? LinkedinUrl { get; set; }
        public string? YoutubeUrl { get; set; }

        // --- 6. SEO & ANALYTICS ---
        public string? GoogleAnalyticsId { get; set; }
        public string? GoogleTagManagerId { get; set; }
        public string? MetaKeywords { get; set; }
        public string? MetaKeywordsTr { get; set; }
        public string? HeadScripts { get; set; }
        public string? RobotsTxt { get; set; }
    }
}