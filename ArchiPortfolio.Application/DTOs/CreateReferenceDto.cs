using Microsoft.AspNetCore.Http;

namespace ArchiPortfolio.Application.DTOs
{
    public class CreateReferenceDto
    {
        public string Title { get; set; }
        public int Order { get; set; }
        public bool IsActive { get; set; }
        public IFormFile LogoFile { get; set; } // Required on creation
    }
}
