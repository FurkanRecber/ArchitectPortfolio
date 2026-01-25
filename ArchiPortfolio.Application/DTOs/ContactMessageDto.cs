using System.Text.Json.Serialization;

namespace ArchiPortfolio.Application.DTOs
{
    public class ContactMessageDto
    {
        public int Id { get; set; }
        
        [JsonPropertyName("senderName")]
        public string SenderName { get; set; }
        public string Email { get; set; }
        public string Subject { get; set; }
        public string ProjectType { get; set; }
        public string EstimatedBudget { get; set; }
        public string Message { get; set; }
        public bool IsRead { get; set; }
        public DateTime CreatedDate { get; set; } // BaseEntity'den gelir
    }
}