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
        Task MarkAsReadAsync(int id);
        Task DeleteMessageAsync(int id); // Bunu da ekleyelim
    }
}