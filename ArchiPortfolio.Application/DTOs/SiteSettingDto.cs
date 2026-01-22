namespace ArchiPortfolio.Application.DTOs
{
    public class SiteSettingDto
    {
        public int Id { get; set; }
        public string HeroTitle { get; set; }
        public string AboutTitle { get; set; }
        public string AboutText { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        
        // Sosyal Medya
        public string FacebookUrl { get; set; }
        public string InstagramUrl { get; set; }
        public string LinkedinUrl { get; set; }
        public string YoutubeUrl { get; set; }
    }
}