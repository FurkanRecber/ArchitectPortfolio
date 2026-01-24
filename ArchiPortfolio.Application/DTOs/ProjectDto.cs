using System;
using System.Collections.Generic;
using System.Text.Json.Serialization; // Bu kütüphane şart

namespace ArchiPortfolio.Application.DTOs
{
    public class ProjectDto
    {
        public int Id { get; set; }

        [JsonPropertyName("title")]
        public string Title { get; set; }
        
        public string Slug { get; set; }

        [JsonPropertyName("description")]
        public string Description { get; set; }

        public string Details { get; set; }

        // Frontend 'imageUrl' bekliyor (Kapak resmi)
        [JsonPropertyName("imageUrl")] 
        public string CoverImageUrl { get; set; }
        
        [JsonPropertyName("client")]
        public string Client { get; set; }
        
        [JsonPropertyName("location")]
        public string Location { get; set; }
        
        // Frontend 'team' bekliyor
        [JsonPropertyName("team")]
        public string ProjectTeam { get; set; }
        
        // Frontend 'year' bekliyor
        [JsonPropertyName("year")]
        public string ProjectYear { get; set; }
        
        [JsonPropertyName("area")]
        public string Area { get; set; }
        
        [JsonPropertyName("status")]
        public string Status { get; set; }
        
        public string PressKitUrl { get; set; }
        public DateTime PublishDate { get; set; }

        public int CategoryId { get; set; }

        // Frontend 'category' diye tek bir string bekliyor
        [JsonPropertyName("category")]
        public string CategoryName { get; set; } 

        // --- YENİ EKLENEN LİSTELER ---
        
        // Normal resimler buraya (IsPlan = false olanlar)
        [JsonPropertyName("gallery")]
        public List<string> Gallery { get; set; } 

        // Mimari planlar buraya (IsPlan = true olanlar)
        [JsonPropertyName("plans")]
        public List<string> Plans { get; set; }
    }
}