using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace ArchiPortfolio.Application.DTOs
{
    public class ProjectUpdateDto : ProjectCreateDto // CreateDto'daki tüm alanları miras alır
    {
        public int Id { get; set; }
        
        // Silinecek galeri resimlerinin URL'lerini tutar (Opsiyonel)
        public List<string>? DeletedGalleryImages { get; set; }
    }
}