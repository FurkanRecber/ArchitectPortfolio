using ArchiPortfolio.Application.DTOs;
using ArchiPortfolio.Domain.Entities;

namespace ArchiPortfolio.Application.Interfaces.Services
{
    public interface ITeamService
    {
        Task<List<TeamMemberDto>> GetAllTeamMembersAsync(string langCode);
        Task AddTeamMemberAsync(TeamMember teamMember);
        Task UpdateTeamMemberAsync(TeamMember teamMember);
        Task DeleteTeamMemberAsync(int id);
    }
}