namespace ArchiPortfolio.Application.DTOs
{
    public class SiteSettingDto
    {
        public int Id { get; set; }

        // General
        public string SiteTitle { get; set; }
        public string LogoUrl { get; set; }
        public string CopyrightText { get; set; }
        public string CopyrightTextTr { get; set; }
        public string FooterDescription { get; set; }
        public string FooterDescriptionTr { get; set; }

        // Hero
        public string HeroTitle { get; set; }
        public string HeroTitleTr { get; set; }
        public string HeroSubtitle { get; set; }
        public string HeroSubtitleTr { get; set; }
        public string HeroButtonText { get; set; }
        public string HeroButtonTextTr { get; set; }
        public string HeroImageUrl { get; set; }

        // CTA
        public string CtaTitle { get; set; }
        public string CtaTitleTr { get; set; }
        public string CtaDescription { get; set; }
        public string CtaDescriptionTr { get; set; }
        public string CtaButtonText { get; set; }
        public string CtaButtonTextTr { get; set; }

        // Studio
        public string YearsActive { get; set; }
        public string ProjectsCompleted { get; set; }
        public string AwardsWon { get; set; }
        public string ShowreelUrl { get; set; }

        // Contact
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string AddressTr { get; set; }
        public string GoogleMapEmbedCode { get; set; }
        public string FacebookUrl { get; set; }
        public string InstagramUrl { get; set; }
        public string LinkedinUrl { get; set; }
        public string YoutubeUrl { get; set; }

        // SEO
        public string GoogleAnalyticsId { get; set; }
        public string GoogleTagManagerId { get; set; }
        public string HeadScripts { get; set; }
        public string MetaKeywords { get; set; }
        public string MetaKeywordsTr { get; set; }
        public string RobotsTxt { get; set; }
    }
}