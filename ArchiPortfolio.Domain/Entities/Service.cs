using ArchiPortfolio.Domain.Common;

namespace ArchiPortfolio.Domain.Entities
{
    /// <summary>
    /// Represents a professional service offered by the studio.
    /// </summary>
    public class Service : BaseEntity
    {
        /// <summary>
        /// Service title in English.
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// Service title in Turkish.
        /// </summary>
        public string TitleTr { get; set; }
    
        /// <summary>
        /// Service description in English.
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Service description in Turkish.
        /// </summary>
        public string DescriptionTr { get; set; }
    
        /// <summary>
        /// CSS class or name for the icon representing the service.
        /// </summary>
        public string IconClass { get; set; }
    }
}