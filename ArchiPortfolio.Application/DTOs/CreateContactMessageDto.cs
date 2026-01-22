namespace ArchiPortfolio.Application.DTOs
{
    public class CreateContactMessageDto
    {
        public string SenderName { get; set; }
        public string Email { get; set; }
        public string ProjectType { get; set; }
        public string EstimatedBudget { get; set; }
        public string Message { get; set; }
    }
}