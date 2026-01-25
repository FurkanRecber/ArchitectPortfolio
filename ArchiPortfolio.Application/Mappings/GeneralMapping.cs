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
            // --- PROJECT (DÜZELTİLDİ) ---
            CreateMap<Project, ProjectDto>()
                .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.Name)) // Dashboard için kritik
                .ForMember(dest => dest.TitleTr, opt => opt.MapFrom(src => src.TitleTr))
                .ForMember(dest => dest.DescriptionTr, opt => opt.MapFrom(src => src.DescriptionTr))
                .ForMember(dest => dest.DetailsTr, opt => opt.MapFrom(src => src.DetailsTr))
                .ForMember(dest => dest.IsFeatured, opt => opt.MapFrom(src => src.IsFeatured))
                .ForMember(dest => dest.Gallery, opt => opt.MapFrom(src => 
                    src.ProjectImages.Where(img => !img.IsPlan).Select(img => img.ImageUrl).ToList()))
                .ForMember(dest => dest.Plans, opt => opt.MapFrom(src => 
                    src.ProjectImages.Where(img => img.IsPlan).Select(img => img.ImageUrl).ToList()))
                .ReverseMap();

            CreateMap<ProjectCreateDto, Project>(); // Bu satır sendeki dosyada YOKTU
            CreateMap<ProjectImage, ProjectImageDto>().ReverseMap();

            // --- CATEGORY ---
            CreateMap<Category, CategoryDto>()
                .ForMember(dest => dest.ProjectCount, opt => opt.MapFrom(src => src.Projects.Count))
                .ReverseMap();

            CreateMap<CreateCategoryDto, Category>()
                .ForMember(dest => dest.CoverImageUrl, opt => opt.Ignore());

            // --- SITE SETTINGS ---
            CreateMap<SiteSetting, SiteSettingDto>().ReverseMap();
            CreateMap<UpdateSiteSettingDto, SiteSetting>()
                .ForMember(dest => dest.LogoUrl, opt => opt.Ignore())
                .ForMember(dest => dest.HeroImageUrl, opt => opt.Ignore())
                .ForMember(dest => dest.AboutImageUrl, opt => opt.Ignore())
                // --- YENİ ---
                .ForMember(dest => dest.PhilosophyIconUrl, opt => opt.Ignore());

            // --- CONTACT & OTHERS ---
            CreateMap<ContactMessage, ContactMessageDto>()
                .ForMember(dest => dest.SenderName, opt => opt.MapFrom(src => src.Name))
                .ReverseMap();
            CreateMap<CreateContactMessageDto, ContactMessage>();

            CreateMap<TeamMember, TeamMemberDto>().ReverseMap();
            CreateMap<Service, ServiceDto>().ReverseMap();

            // --- AUTH (Bu satır sendeki dosyada YOKTU) ---
            CreateMap<User, LoginDto>().ReverseMap();
            
            CreateMap<ProjectUpdateDto, Project>()
                .ForMember(dest => dest.CoverImageUrl, opt => opt.Ignore()) // Dosyayı serviste işleyeceğiz
                .ForMember(dest => dest.ProjectImages, opt => opt.Ignore()); // Galeriyi serviste işleyeceğiz
        }
    }
}