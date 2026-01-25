using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

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

        // DÜZELTME: Frontend 'coverImageUrl' bekliyor, 'imageUrl' değil!
        [JsonPropertyName("coverImageUrl")] 
        public string CoverImageUrl { get; set; }
        
        [JsonPropertyName("client")]
        public string Client { get; set; }
        
        [JsonPropertyName("location")]
        public string Location { get; set; }
        
        [JsonPropertyName("team")]
        public string ProjectTeam { get; set; }
        
        [JsonPropertyName("year")]
        public string ProjectYear { get; set; }
        
        [JsonPropertyName("area")]
        public string Area { get; set; }
        
        [JsonPropertyName("status")]
        public string Status { get; set; }
        
        public string PressKitUrl { get; set; }
        public DateTime PublishDate { get; set; }

        public int CategoryId { get; set; }

        [JsonPropertyName("category")]
        public string CategoryName { get; set; } 

        [JsonPropertyName("gallery")]
        public List<string> Gallery { get; set; } 

        [JsonPropertyName("plans")]
        public List<string> Plans { get; set; }
    }
}