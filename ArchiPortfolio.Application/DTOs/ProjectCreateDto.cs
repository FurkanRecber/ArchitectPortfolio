using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace ArchiPortfolio.Application.DTOs
{
    public class ProjectCreateDto
    {
        public int? Id { get; set; }

        // --- İNGİLİZCE (Ve Ortak Olarak Kullanılacaklar) ---
        [System.ComponentModel.DataAnnotations.Display(Name = "Title")]
        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "{0} is required.")]
        public string Title { get; set; }

        [System.ComponentModel.DataAnnotations.Display(Name = "Description")]
        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "{0} is required.")]
        public string Description { get; set; }

        [System.ComponentModel.DataAnnotations.Display(Name = "Details")]
        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "{0} is required.")]
        public string Details { get; set; }

        [System.ComponentModel.DataAnnotations.Display(Name = "Client")]
        public string Client { get; set; }       // Ortak

        [System.ComponentModel.DataAnnotations.Display(Name = "Location")]
        public string Location { get; set; }     // Ortak

        [System.ComponentModel.DataAnnotations.Display(Name = "Project Team")]
        public string ProjectTeam { get; set; }  // Ortak

        // --- SADECE ÇEVİRİSİ OLANLAR (TÜRKÇE) ---
        [System.ComponentModel.DataAnnotations.Display(Name = "Title (TR)")]
        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "{0} is required.")]
        public string TitleTr { get; set; }

        [System.ComponentModel.DataAnnotations.Display(Name = "Description (TR)")]
        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "{0} is required.")]
        public string DescriptionTr { get; set; }

        [System.ComponentModel.DataAnnotations.Display(Name = "Details (TR)")]
        [System.ComponentModel.DataAnnotations.Required(ErrorMessage = "{0} is required.")]
        public string DetailsTr { get; set; }
        
        // (ClientTr, LocationTr, ProjectTeamTr -> KALDIRILDI)

        // --- DİĞER ORTAK ALANLAR ---
        [System.ComponentModel.DataAnnotations.Display(Name = "Project Year")]
        public string ProjectYear { get; set; }

        [System.ComponentModel.DataAnnotations.Display(Name = "Area")]
        public string Area { get; set; }
        
        public string Status { get; set; } = "Completed";
        public bool IsFeatured { get; set; } = false;
        
        public int CategoryId { get; set; }

        // --- DOSYALAR ---
        public IFormFile? CoverImage { get; set; }
        public List<IFormFile>? GalleryImages { get; set; }
    }
}