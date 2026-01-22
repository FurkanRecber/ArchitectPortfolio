using ArchiPortfolio.Domain.Common;

namespace ArchiPortfolio.Domain.Entities
{
    public class ContactMessage : BaseEntity
    {
        // Formda "Full Name" olduğu için SenderName yerine FullName diyebiliriz veya SenderName kalabilir.
        // Senin kodunda SenderName var, tutarlılık için SenderName kalsın ama formdan FullName bind edeceğiz.
        public string SenderName { get; set; } 
        public string Email { get; set; }
        public string ProjectType { get; set; } // Residential, Commercial vb.
        public string EstimatedBudget { get; set; } // $50k - $100k
        public string Message { get; set; }
        public bool IsRead { get; set; } = false;
    }
}