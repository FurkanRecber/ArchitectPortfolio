using System;
using System.Collections.Generic;

namespace ArchiPortfolio.Application.DTOs
{
    public class ProjectDto
    {
        public int Id { get; set; }
        public string Title { get; set; }        // Dil seçimine göre dolacak
        public string Slug { get; set; }
        public string Description { get; set; }  // Dil seçimine göre dolacak
        public string Details { get; set; }      // Dil seçimine göre dolacak
        public string CoverImageUrl { get; set; }
        
        public string Client { get; set; }       // Dil seçimine göre dolacak
        public string Location { get; set; }     // Dil seçimine göre dolacak
        public string ProjectTeam { get; set; }  // Dil seçimine göre dolacak
        
        public string ProjectYear { get; set; }
        public string Area { get; set; }
        public string Status { get; set; }
        public string PressKitUrl { get; set; }
        public DateTime PublishDate { get; set; }

        public int CategoryId { get; set; }
        public string CategoryName { get; set; } // İlişkili tablodan sadece ismini alacağız

        public List<ProjectImageDto> ProjectImages { get; set; }
    }
}