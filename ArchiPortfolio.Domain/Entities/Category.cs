using ArchiPortfolio.Domain.Common;

namespace ArchiPortfolio.Domain.Entities
{
    public class Category : BaseEntity
    {
        public string Name { get; set; }    // "Residential"
        public string NameTr { get; set; }  // "Konut"
    
        public ICollection<Project> Projects { get; set; }
    }
}