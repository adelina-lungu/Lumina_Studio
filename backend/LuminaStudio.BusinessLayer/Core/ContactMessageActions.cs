using AutoMapper;
using LuminaStudio.DataAccessLayer.Context;
using LuminaStudio.Domain.Entities.ContactMessage;
using LuminaStudio.Domain.Models.ContactMessage;
using LuminaStudio.Domain.Models.Responses;

namespace LuminaStudio.BusinessLayer.Core
{
    public class ContactMessageActions
    {
        protected readonly IMapper _mapper;

        protected ContactMessageActions(IMapper mapper)
        {
            _mapper = mapper;
        }

        protected List<ContactMessageDto> GetAllExecution()
        {
            using var context = new AppDbContext();

            var messages = context.ContactMessages
                .OrderByDescending(m => m.CreatedOn)
                .ToList();

            return messages.Select(m => _mapper.Map<ContactMessageDto>(m)).ToList();
        }

        protected ActionResponse CreateExecution(CreateContactMessageDto dto, int? userId)
        {
            using var context = new AppDbContext();

            var message = _mapper.Map<ContactMessageData>(dto);
            message.UserId = userId;

            context.ContactMessages.Add(message);
            context.SaveChanges();

            return ActionResponse.Ok("Message sent successfully.");
        }

        protected ActionResponse MarkAsReadExecution(int id)
        {
            using var context = new AppDbContext();

            var message = context.ContactMessages.FirstOrDefault(m => m.Id == id);

            if (message == null)
                return ActionResponse.Fail("Message not found.");

            message.IsRead = true;
            context.SaveChanges();

            return ActionResponse.Ok("Message marked as read.");
        }

        protected ActionResponse MarkAsResolvedExecution(int id)
        {
            using var context = new AppDbContext();

            var message = context.ContactMessages.FirstOrDefault(m => m.Id == id);

            if (message == null)
                return ActionResponse.Fail("Message not found.");

            message.IsResolved = true;
            context.SaveChanges();

            return ActionResponse.Ok("Message marked as resolved.");
        }
    }
}
