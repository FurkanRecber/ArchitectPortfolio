using System.Text.Json.Serialization;

namespace ArchiPortfolio.Application.DTOs
{
    public class CreateContactMessageDto
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("email")]
        public string Email { get; set; }

        [JsonPropertyName("subject")]
        public string Subject { get; set; }

        [JsonPropertyName("message")]
        public string Message { get; set; }
    }
}