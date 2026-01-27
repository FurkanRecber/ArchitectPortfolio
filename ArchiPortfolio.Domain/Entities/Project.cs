using ArchiPortfolio.Domain.Common;

namespace ArchiPortfolio.Domain.Entities
{
    /// <summary>
    /// Represents an architectural project within the portfolio.
    /// </summary>
    public class Project : BaseEntity
    {
        /// <summary>
        /// Project title in English.
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// Short description of the project in English.
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Detailed information about the project in English.
        /// </summary>
        public string Details { get; set; }

        /// <summary>
        /// Client name or description in English.
        /// </summary>
        public string Client { get; set; }

        /// <summary>
        /// Project location in English.
        /// </summary>
        public string Location { get; set; }

        /// <summary>
        /// Members of the project team in English.
        /// </summary>
        public string ProjectTeam { get; set; }

        /// <summary>
        /// Project title in Turkish.
        /// </summary>
        public string TitleTr { get; set; }

        /// <summary>
        /// Short description of the project in Turkish.
        /// </summary>
        public string DescriptionTr { get; set; }

        /// <summary>
        /// Detailed information about the project in Turkish.
        /// </summary>
        public string DetailsTr { get; set; }

        /// <summary>
        /// Client name or description in Turkish.
        /// </summary>
        public string ClientTr { get; set; }

        /// <summary>
        /// Project location in Turkish.
        /// </summary>
        public string LocationTr { get; set; }

        /// <summary>
        /// Members of the project team in Turkish.
        /// </summary>
        public string ProjectTeamTr { get; set; }

        /// <summary>
        /// URL-friendly identifier for the project.
        /// </summary>
        public string Slug { get; set; }

        /// <summary>
        /// URL of the main cover image for the project.
        /// </summary>
        public string CoverImageUrl { get; set; }

        /// <summary>
        /// The year the project was designed or completed.
        /// </summary>
        public string ProjectYear { get; set; }

        /// <summary>
        /// The physical area or size of the project.
        /// </summary>
        public string Area { get; set; }

        /// <summary>
        /// Completion status of the project (e.g., "Completed").
        /// </summary>
        public string Status { get; set; }

        /// <summary>
        /// Indicates whether the project should be highlighted on the home page.
        /// </summary>
        public bool IsFeatured { get; set; }

        /// <summary>
        /// The date the project was published to the portfolio.
        /// </summary>
        public DateTime PublishDate { get; set; }

        /// <summary>
        /// Foreign key for the project's category.
        /// </summary>
        public int CategoryId { get; set; }

        /// <summary>
        /// Navigation property for the associated category.
        /// </summary>
        public Category Category { get; set; }

        /// <summary>
        /// Collection of additional images for the project.
        /// </summary>
        public ICollection<ProjectImage> ProjectImages { get; set; }
    }
}