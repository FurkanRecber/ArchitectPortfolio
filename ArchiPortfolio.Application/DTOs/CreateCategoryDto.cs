using Microsoft.AspNetCore.Http;

namespace ArchiPortfolio.Application.DTOs
{
    public class CreateCategoryDto
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string NameTr { get; set; }
        public string Description { get; set; }
        public string DescriptionTr { get; set; }
        public int IconId { get; set; }
        public IFormFile? CoverImage { get; set; }
    }
}