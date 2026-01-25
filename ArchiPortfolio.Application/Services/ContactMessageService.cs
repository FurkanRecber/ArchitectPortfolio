using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using ArchiPortfolio.Application.DTOs;
using ArchiPortfolio.Application.Interfaces.Repositories;
using ArchiPortfolio.Application.Interfaces.Services;
using ArchiPortfolio.Domain.Entities;
using Microsoft.Extensions.Configuration;

namespace ArchiPortfolio.Application.Services
{
    public class ContactMessageService : IContactMessageService
    {
        private readonly IGenericRepository<ContactMessage> _repository;
        private readonly IMapper _mapper;
        private readonly IEmailService _emailService;
        private readonly IConfiguration _configuration;

        public ContactMessageService(
            IGenericRepository<ContactMessage> repository, 
            IMapper mapper,
            IEmailService emailService,
            IConfiguration configuration)
        {
            _repository = repository;
            _mapper = mapper;
            _emailService = emailService;
            _configuration = configuration;
        }

        // Interface ile uyumlu metod ismi: CreateMessageAsync
        public async Task CreateMessageAsync(CreateContactMessageDto messageDto)
        {
            var message = _mapper.Map<ContactMessage>(messageDto);
            
            // BaseEntity'deki CreatedDate alanını kullanıyoruz
            message.CreatedDate = DateTime.UtcNow; 
            message.IsRead = false;

            await _repository.AddAsync(message);
            await _repository.SaveChangesAsync();

            // Mail Gönderimi
            try 
            {
                var adminEmail = _configuration["SmtpSettings:ReceiverEmail"]; 

                string subject = $"New Contact: {message.Subject}";
                string body = $@"
                    <h3>Yeni İletişim Mesajı</h3>
                    <p><strong>Gönderen:</strong> {message.Name} ({message.Email})</p>
                    <p><strong>Konu:</strong> {message.Subject}</p>
                    <hr/>
                    <p>{message.Message}</p>
                ";

                await _emailService.SendEmailAsync(adminEmail, subject, body);
            }
            catch (Exception)
            {
                // Mail hatası loglanabilir ama kullanıcıya hata dönmemeli
            }
        }

        public async Task<List<ContactMessageDto>> GetAllMessagesAsync()
        {
            var messages = await _repository.GetAllAsync();
            messages.Sort((a, b) => b.CreatedDate.CompareTo(a.CreatedDate)); // CreatedDate'e göre sırala
            return _mapper.Map<List<ContactMessageDto>>(messages);
        }

        public async Task MarkAsReadAsync(int id)
        {
            var message = await _repository.GetByIdAsync(id);
            if (message != null)
            {
                message.IsRead = true;
                _repository.Update(message);
                await _repository.SaveChangesAsync();
            }
        }

        public async Task DeleteMessageAsync(int id)
        {
            var message = await _repository.GetByIdAsync(id);
            if (message != null)
            {
                _repository.Delete(message);
                await _repository.SaveChangesAsync();
            }
        }
    }
}