using AutoMapper;
using ArchiPortfolio.Application.DTOs;
using ArchiPortfolio.Domain.Entities;
using System.Linq;

namespace ArchiPortfolio.Application.Mappings
{
    public class GeneralMapping : Profile
    {
        public GeneralMapping()
        {
          
            CreateMap<ContactMessage, ContactMessageDto>()
                .ForMember(dest => dest.SenderName, opt => opt.MapFrom(src => src.Name))
                .ReverseMap();

            CreateMap<CreateContactMessageDto, ContactMessage>();

           
            CreateMap<ProjectImage, ProjectImageDto>();
            
            CreateMap<Project, ProjectDto>()
                .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.Name))
                .ForMember(dest => dest.Gallery, opt => opt.MapFrom(src => 
                    src.ProjectImages.Where(img => !img.IsPlan).Select(img => img.ImageUrl).ToList()))
                .ForMember(dest => dest.Plans, opt => opt.MapFrom(src => 
                    src.ProjectImages.Where(img => img.IsPlan).Select(img => img.ImageUrl).ToList()));

            CreateMap<Category, CategoryDto>();
            CreateMap<Service, ServiceDto>();
            CreateMap<TeamMember, TeamMemberDto>();
            CreateMap<SiteSetting, SiteSettingDto>();
        }
    }
}