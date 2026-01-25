namespace ArchiPortfolio.Application.DTOs
{
    public class CategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string NameTr { get; set; } // Edit sayfası için lazım
        public string Description { get; set; }
        public string DescriptionTr { get; set; } // Edit sayfası için lazım
        public int IconId { get; set; }
        public string CoverImageUrl { get; set; }
        public int ProjectCount { get; set; }
    }
}