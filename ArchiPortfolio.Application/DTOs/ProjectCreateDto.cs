using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace ArchiPortfolio.Application.DTOs
{
    public class ProjectCreateDto
    {
        public int? Id { get; set; }

        // --- İNGİLİZCE (Ve Ortak Olarak Kullanılacaklar) ---
        public string Title { get; set; }
        public string Description { get; set; }
        public string Details { get; set; }
        public string Client { get; set; }       // Ortak
        public string Location { get; set; }     // Ortak
        public string ProjectTeam { get; set; }  // Ortak

        // --- SADECE ÇEVİRİSİ OLANLAR (TÜRKÇE) ---
        public string TitleTr { get; set; }
        public string DescriptionTr { get; set; }
        public string DetailsTr { get; set; }
        
        // (ClientTr, LocationTr, ProjectTeamTr -> KALDIRILDI)

        // --- DİĞER ORTAK ALANLAR ---
        public string ProjectYear { get; set; }
        public string Area { get; set; }
        public string Status { get; set; } = "Completed";
        public bool IsFeatured { get; set; } = false;
        
        public int CategoryId { get; set; }

        // --- DOSYALAR ---
        public IFormFile? CoverImage { get; set; }
        public List<IFormFile>? GalleryImages { get; set; }
    }
}