using System;

namespace ArchiPortfolio.Application.DTOs
{
    /// <summary>
    /// Data transfer object containing authentication tokens.
    /// </summary>
    public class TokenDto
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public DateTime Expiration { get; set; }
    }
}