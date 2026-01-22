using ArchiPortfolio.Domain.Common;

namespace ArchiPortfolio.Domain.Entities
{
    public class TeamMember : BaseEntity
    {
        public string FullName { get; set; } // İsim değişmez
    
        public string Title { get; set; }    // "Lead Architect"
        public string TitleTr { get; set; }  // "Baş Mimar"
    
        public string Bio { get; set; }
        public string BioTr { get; set; }
    
        public string ImageUrl { get; set; }
        public string LinkedinUrl { get; set; }
        public string InstagramUrl { get; set; }
        public string TwitterUrl { get; set; }
        public int Order { get; set; }
    }
}