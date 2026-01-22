using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using ArchiPortfolio.Application.DTOs;
using ArchiPortfolio.Application.Interfaces.Repositories;
using ArchiPortfolio.Application.Interfaces.Services;
using ArchiPortfolio.Domain.Entities;

namespace ArchiPortfolio.Application.Services
{
    public class TeamService : ITeamService
    {
        private readonly IGenericRepository<TeamMember> _repository;
        private readonly IMapper _mapper;

        public TeamService(IGenericRepository<TeamMember> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<List<TeamMemberDto>> GetAllTeamMembersAsync(string langCode)
        {
            var team = await _repository.GetAllAsync();
            var dtos = new List<TeamMemberDto>();

            foreach (var member in team)
            {
                var dto = _mapper.Map<TeamMemberDto>(member);
                if (langCode == "tr")
                {
                    dto.Title = !string.IsNullOrEmpty(member.TitleTr) ? member.TitleTr : member.Title;
                    dto.Bio = !string.IsNullOrEmpty(member.BioTr) ? member.BioTr : member.Bio;
                }
                dtos.Add(dto);
            }
            return dtos;
        }

        public async Task AddTeamMemberAsync(TeamMember teamMember)
        {
            await _repository.AddAsync(teamMember);
            await _repository.SaveChangesAsync();
        }

        public async Task UpdateTeamMemberAsync(TeamMember teamMember)
        {
            _repository.Update(teamMember);
            await _repository.SaveChangesAsync();
        }

        public async Task DeleteTeamMemberAsync(int id)
        {
            var member = await _repository.GetByIdAsync(id);
            if (member != null)
            {
                _repository.Delete(member);
                await _repository.SaveChangesAsync();
            }
        }
    }
}