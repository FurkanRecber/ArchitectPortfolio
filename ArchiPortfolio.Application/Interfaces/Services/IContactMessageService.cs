using ArchiPortfolio.Application.DTOs;

namespace ArchiPortfolio.Application.Interfaces.Services
{
    public interface IContactMessageService
    {
        Task CreateMessageAsync(CreateContactMessageDto createDto);
        Task<List<ContactMessageDto>> GetAllMessagesAsync();
        Task MarkAsReadAsync(int id);
    }
}