namespace ArchiPortfolio.Application.DTOs
{
    public class TeamMemberDto
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Title { get; set; } // Dile göre
        public string Bio { get; set; }   // Dile göre
        public string ImageUrl { get; set; }
        
        public string LinkedinUrl { get; set; }
        public string InstagramUrl { get; set; }
        public string TwitterUrl { get; set; }
    }
}