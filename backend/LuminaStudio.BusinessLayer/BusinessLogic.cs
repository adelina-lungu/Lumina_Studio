using AutoMapper;
using LuminaStudio.BusinessLayer.Interfaces;
using LuminaStudio.BusinessLayer.Mapping;
using LuminaStudio.BusinessLayer.Structure;
using Microsoft.Extensions.Logging;

namespace LuminaStudio.BusinessLayer
{
    public class BusinessLogic
    {
        private readonly IMapper _mapper;

        public BusinessLogic()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<MappingProfile>();
            }, new LoggerFactory());

            _mapper = config.CreateMapper();
        }

        public IAuthActions GetAuthActions() => new AuthExecution(_mapper);
        public IUserActions GetUserActions() => new UserExecution(_mapper);
        public IBookingActions GetBookingActions() => new BookingExecution(_mapper);
        public IPhotographerActions GetPhotographerActions() => new PhotographerExecution(_mapper);
        public IServicePackageActions GetServicePackageActions() => new ServicePackageExecution(_mapper);
        public IPortfolioImageActions GetPortfolioImageActions() => new PortfolioImageExecution(_mapper);
        public ITestimonialActions GetTestimonialActions() => new TestimonialExecution(_mapper);
        public IFaqItemActions GetFaqItemActions() => new FaqItemExecution(_mapper);
        public IChatActions GetChatActions() => new ChatExecution(_mapper);
        public IContactMessageActions GetContactMessageActions() => new ContactMessageExecution(_mapper);
    }
}
