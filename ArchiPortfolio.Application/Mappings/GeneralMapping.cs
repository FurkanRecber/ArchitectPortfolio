using AutoMapper;
using ArchiPortfolio.Domain.Entities;
using ArchiPortfolio.Application.DTOs;
using System.Linq;

namespace ArchiPortfolio.Application.Mappings
{
    public class GeneralMapping : Profile
    {
        public GeneralMapping()
        {
            // ProjectImage -> ProjectImageDto
            CreateMap<ProjectImage, ProjectImageDto>();
            
            // Project -> ProjectDto
            CreateMap<Project, ProjectDto>()
                .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.Name))
                
                // CoverImageUrl isimleri aynı olduğu için OTOMATİK eşleşir, yazmaya gerek yok.

                // Galeri: IsPlan FALSE olanlar
                .ForMember(dest => dest.Gallery, opt => opt.MapFrom(src => 
                    src.ProjectImages
                        .Where(img => !img.IsPlan)
                        .Select(img => img.ImageUrl)
                        .ToList()))
                       
                // Planlar: IsPlan TRUE olanlar
                .ForMember(dest => dest.Plans, opt => opt.MapFrom(src => 
                    src.ProjectImages
                        .Where(img => img.IsPlan)
                        .Select(img => img.ImageUrl)
                        .ToList()));

            // Diğer Eşleşmeler
            CreateMap<Category, CategoryDto>();
            CreateMap<Service, ServiceDto>();
            CreateMap<TeamMember, TeamMemberDto>();
            CreateMap<ContactMessage, ContactMessageDto>().ReverseMap();
            CreateMap<ContactMessage, CreateContactMessageDto>().ReverseMap();
            CreateMap<SiteSetting, SiteSettingDto>();
        }
    }
}