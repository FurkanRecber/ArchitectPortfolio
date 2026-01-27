using ArchiPortfolio.Domain.Common;

namespace ArchiPortfolio.Domain.Entities
{
    /// <summary>
    /// Represents an image associated with a project.
    /// </summary>
    public class ProjectImage : BaseEntity
    {
        /// <summary>
        /// URL of the image.
        /// </summary>
        public string ImageUrl { get; set; }

        /// <summary>
        /// Indicates whether the image represents a architectural plan.
        /// </summary>
        public bool IsPlan { get; set; } = false;

        /// <summary>
        /// Foreign key for the associated project.
        /// </summary>
        public int ProjectId { get; set; }

        /// <summary>
        /// Navigation property for the associated project.
        /// </summary>
        public Project Project { get; set; }
    }
}