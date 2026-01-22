using AutoMapper;
using ArchiPortfolio.Application.DTOs;
using ArchiPortfolio.Application.Interfaces.Repositories;
using ArchiPortfolio.Application.Interfaces.Services;
using ArchiPortfolio.Domain.Entities;

namespace ArchiPortfolio.Application.Services
{
    public class ContactMessageService : IContactMessageService
    {
        private readonly IGenericRepository<ContactMessage> _repository;
        private readonly IMapper _mapper;

        public ContactMessageService(IGenericRepository<ContactMessage> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task CreateMessageAsync(CreateContactMessageDto createDto)
        {
            var entity = _mapper.Map<ContactMessage>(createDto);
            await _repository.AddAsync(entity);
            await _repository.SaveChangesAsync();
        }

        public async Task<List<ContactMessageDto>> GetAllMessagesAsync()
        {
            var messages = await _repository.GetAllAsync();
            // Tarihe göre sıralı (en yeni en üstte)
            var orderedMessages = messages.OrderByDescending(x => x.CreatedDate).ToList();
            return _mapper.Map<List<ContactMessageDto>>(orderedMessages);
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
    }
}