using Microsoft.AspNetCore.Http;

namespace ArchiPortfolio.Application.DTOs
{
    public class CreateCategoryDto
    {
        public int? Id { get; set; }

        [System.ComponentModel.DataAnnotations.Display(Name = "Category Name")]
        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "{0} is required.")]
        public string Name { get; set; }

        [System.ComponentModel.DataAnnotations.Display(Name = "Category Name (TR)")]
        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "{0} is required.")]
        public string NameTr { get; set; }

        [System.ComponentModel.DataAnnotations.Display(Name = "Description")]
        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "{0} is required.")]
        public string Description { get; set; }

        [System.ComponentModel.DataAnnotations.Display(Name = "Description (TR)")]
        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "{0} is required.")]
        public string DescriptionTr { get; set; }

        public int IconId { get; set; }
        public IFormFile? CoverImage { get; set; }
    }
}