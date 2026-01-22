using AutoMapper;
using ArchiPortfolio.Domain.Entities;
using ArchiPortfolio.Application.DTOs;

namespace ArchiPortfolio.Application.Mappings
{
    public class GeneralMapping : Profile
    {
        public GeneralMapping()
        {
            // Basit Eşleşmeler
            CreateMap<ProjectImage, ProjectImageDto>();
            
            // Dil Mantığı Olmayanlar (Direkt eşleşir)
            // Ama biz bunları Service katmanında manuel (Custom) mapleyeceğiz.
            // O yüzden şimdilik buraya "boş" bir map tanımı yapıyoruz ki hata vermesin.
            // Asıl "Türkçe mi İngilizce mi" kararını Service katmanında vereceğiz.
            
            CreateMap<Project, ProjectDto>()
                .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.Name)); 
            // Kategori ismini otomatik çek

            CreateMap<Category, CategoryDto>();
            CreateMap<Service, ServiceDto>();
            CreateMap<TeamMember, TeamMemberDto>();
            CreateMap<ContactMessage, CreateContactMessageDto>().ReverseMap();
        }
    }
}