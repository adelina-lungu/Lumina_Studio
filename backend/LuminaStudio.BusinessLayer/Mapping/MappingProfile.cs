using AutoMapper;
using LuminaStudio.Domain.Entities.Booking;
using LuminaStudio.Domain.Entities.Chat;
using LuminaStudio.Domain.Entities.ContactMessage;
using LuminaStudio.Domain.Entities.FaqItem;
using LuminaStudio.Domain.Entities.Photographer;
using LuminaStudio.Domain.Entities.PortfolioImage;
using LuminaStudio.Domain.Entities.ServicePackage;
using LuminaStudio.Domain.Entities.Testimonial;
using LuminaStudio.Domain.Entities.User;
using LuminaStudio.Domain.Models.Auth;
using LuminaStudio.Domain.Models.Booking;
using LuminaStudio.Domain.Models.Chat;
using LuminaStudio.Domain.Models.ContactMessage;
using LuminaStudio.Domain.Models.FaqItem;
using LuminaStudio.Domain.Models.Photographer;
using LuminaStudio.Domain.Models.PortfolioImage;
using LuminaStudio.Domain.Models.ServicePackage;
using LuminaStudio.Domain.Models.Testimonial;
using LuminaStudio.Domain.Models.User;

namespace LuminaStudio.BusinessLayer.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<UserData, UserDto>();

            CreateMap<UserRegisterDto, UserData>()
                .ForMember(dest => dest.PasswordHash, opt => opt.Ignore());

            CreateMap<PhotographerData, PhotographerDto>()
                .ForMember(dest => dest.BusyDates, opt => opt.Ignore());

            CreateMap<PhotographerAvailabilityData, AvailabilityDto>();

            CreateMap<ServicePackageData, ServicePackageDto>()
                .ForMember(dest => dest.Features, opt => opt.MapFrom(
                    src => src.Features.OrderBy(f => f.DisplayOrder).Select(f => f.Text).ToList()));

            CreateMap<BookingData, BookingDto>()
                .ForMember(dest => dest.PhotographerName, opt => opt.MapFrom(src => src.Photographer.Name))
                .ForMember(dest => dest.PackageName, opt => opt.MapFrom(src => src.Package.Name));

            CreateMap<CreateBookingDto, BookingData>();

            CreateMap<PortfolioImageData, PortfolioImageDto>();
            CreateMap<CreatePortfolioImageDto, PortfolioImageData>();

            CreateMap<TestimonialData, TestimonialDto>();
            CreateMap<CreateTestimonialDto, TestimonialData>();

            CreateMap<FaqItemData, FaqItemDto>();
            CreateMap<CreateFaqItemDto, FaqItemData>();

            CreateMap<ChatConversationData, ChatConversationDto>()
                .ForMember(dest => dest.UnreadCount, opt => opt.MapFrom(
                    src => src.Messages.Count(m => !m.IsRead)));

            CreateMap<ChatMessageData, ChatMessageDto>();

            CreateMap<ContactMessageData, ContactMessageDto>();
            CreateMap<CreateContactMessageDto, ContactMessageData>();
        }
    }
}
