using ArchiPortfolio.Domain.Common;

namespace ArchiPortfolio.Domain.Entities
{
    public class User : BaseEntity
    {
        public string Username { get; set; } // Genelde Email ile aynı tutulur ama ayrı da olabilir
        public string Email { get; set; } 
        public string FirstName { get; set; } 
        public string LastName { get; set; } 
        
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        
        public string Role { get; set; } = "Admin";
        public bool Status { get; set; } = true; 
    }
}