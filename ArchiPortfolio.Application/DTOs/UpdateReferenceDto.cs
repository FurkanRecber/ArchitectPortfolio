using Microsoft.AspNetCore.Http;

namespace ArchiPortfolio.Application.DTOs
{
    public class UpdateReferenceDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int Order { get; set; }
        public bool IsActive { get; set; }
        public IFormFile? LogoFile { get; set; } // Optional on update
    }
}
