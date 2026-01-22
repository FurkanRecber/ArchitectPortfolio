using ArchiPortfolio.Domain.Common;

namespace ArchiPortfolio.Domain.Entities
{
    public class Service : BaseEntity
    {
        public string Title { get; set; }
        public string TitleTr { get; set; }
    
        public string Description { get; set; }
        public string DescriptionTr { get; set; }
    
        public string IconClass { get; set; }
    }
}