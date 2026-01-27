using ArchiPortfolio.Domain.Common;

namespace ArchiPortfolio.Domain.Entities
{
    /// <summary>
    /// Represents a project category (e.g., Residential, Commercial).
    /// </summary>
    public class Category : BaseEntity
    {
        /// <summary>
        /// Name of the category in English.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Name of the category in Turkish.
        /// </summary>
        public string NameTr { get; set; }
        
        /// <summary>
        /// Descriptive text about the category in English.
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Descriptive text about the category in Turkish.
        /// </summary>
        public string DescriptionTr { get; set; }

        /// <summary>
        /// ID of the icon associated with this category in the frontend.
        /// </summary>
        public int IconId { get; set; }

        /// <summary>
        /// URL of the cover image for this category.
        /// </summary>
        public string CoverImageUrl { get; set; }

        /// <summary>
        /// Collection of projects belonging to this category.
        /// </summary>
        public ICollection<Project> Projects { get; set; }
    }
}