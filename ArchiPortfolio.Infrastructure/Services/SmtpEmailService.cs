using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using ArchiPortfolio.Application.Interfaces.Services;
using Microsoft.Extensions.Configuration;

namespace ArchiPortfolio.Infrastructure.Services
{
    public class SmtpEmailService : IEmailService
    {
        private readonly IConfiguration _configuration;

        public SmtpEmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendEmailAsync(string toEmail, string subject, string messageBody)
        {
            var smtpSettings = _configuration.GetSection("SmtpSettings");
            
            var host = smtpSettings["Host"];
            var port = int.Parse(smtpSettings["Port"]);
            var senderEmail = smtpSettings["SenderEmail"];
            var password = smtpSettings["Password"];
            var enableSsl = bool.Parse(smtpSettings["EnableSsl"]);

            using (var client = new SmtpClient(host, port))
            {
                client.Credentials = new NetworkCredential(senderEmail, password);
                client.EnableSsl = enableSsl;

                var mailMessage = new MailMessage
                {
                    From = new MailAddress(senderEmail, "Vivere Design"),
                    Subject = subject,
                    Body = messageBody,
                    IsBodyHtml = true
                };

                mailMessage.To.Add(toEmail);

                await client.SendMailAsync(mailMessage);
            }
        }
    }
}