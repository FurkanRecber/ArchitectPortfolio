using ArchiPortfolio.Domain.Common;

namespace ArchiPortfolio.Domain.Entities
{
    public class ProjectImage : BaseEntity
    {
        public string ImageUrl { get; set; }
        public bool IsPlan { get; set; } = false;
        public int ProjectId { get; set; }
        public Project Project { get; set; }
    }
}