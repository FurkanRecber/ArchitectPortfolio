using ArchiPortfolio.Domain.Common;

namespace ArchiPortfolio.Domain.Entities
{
    public class Slider : BaseEntity
    {
        public string Title { get; set; }
        public string TitleTr { get; set; }
    
        public string Subtitle { get; set; }
        public string SubtitleTr { get; set; }
    
        public string Description { get; set; }
        public string DescriptionTr { get; set; }
    
        public string ImageUrl { get; set; }
        public string LinkUrl { get; set; }
        public int Order { get; set; }
        public bool IsActive { get; set; }
    }
}