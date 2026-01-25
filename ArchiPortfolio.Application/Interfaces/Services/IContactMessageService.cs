using System.Collections.Generic;
using System.Threading.Tasks;
using ArchiPortfolio.Application.DTOs;

namespace ArchiPortfolio.Application.Interfaces.Services
{
    public interface IContactMessageService
    {
        // İsim birliği sağlandı: CreateMessageAsync
        Task CreateMessageAsync(CreateContactMessageDto createDto);
        Task<List<ContactMessageDto>> GetAllMessagesAsync();
        Task<ContactMessageDto> GetMessageByIdAsync(int id);
        Task MarkAsReadAsync(int id);
        Task ReplyToMessageAsync(int id, string subject, string messageBody);
        Task DeleteMessageAsync(int id); // Bunu da ekleyelim
    }
}