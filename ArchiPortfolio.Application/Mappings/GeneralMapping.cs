using AutoMapper;
using ArchiPortfolio.Domain.Entities;
using ArchiPortfolio.Application.DTOs;
using System.Linq; // Select ve Where için gerekli

namespace ArchiPortfolio.Application.Mappings
{
    public class GeneralMapping : Profile
    {
        public GeneralMapping()
        {
            CreateMap<ProjectImage, ProjectImageDto>();
            
            CreateMap<Project, ProjectDto>()
                .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.Name))
                
                // Galeri: IsPlan FALSE olanların sadece URL'lerini al
                .ForMember(dest => dest.Gallery, opt => opt.MapFrom(src => 
                    src.ProjectImages
                        .Where(img => !img.IsPlan)
                        .Select(img => img.ImageUrl)
                        .ToList()))
                       
                // Planlar: IsPlan TRUE olanların sadece URL'lerini al
                .ForMember(dest => dest.Plans, opt => opt.MapFrom(src => 
                    src.ProjectImages
                        .Where(img => img.IsPlan)
                        .Select(img => img.ImageUrl)
                        .ToList()));

            CreateMap<Category, CategoryDto>();
            CreateMap<Service, ServiceDto>();
            CreateMap<TeamMember, TeamMemberDto>();
            CreateMap<ContactMessage, CreateContactMessageDto>().ReverseMap();
            CreateMap<SiteSetting, SiteSettingDto>();
        }
    }
}