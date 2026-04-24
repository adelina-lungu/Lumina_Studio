using AutoMapper;
using LuminaStudio.DataAccessLayer.Context;
using LuminaStudio.Domain.Enums;
using LuminaStudio.Domain.Models.Responses;
using LuminaStudio.Domain.Models.User;

namespace LuminaStudio.BusinessLayer.Core
{
    public class UserActions
    {
        protected readonly IMapper _mapper;

        protected UserActions(IMapper mapper)
        {
            _mapper = mapper;
        }

        protected UserDto? GetByIdExecution(int id)
        {
            using var context = new AppDbContext();

            var user = context.Users.FirstOrDefault(u => u.Id == id);

            if (user == null)
                return null;

            return _mapper.Map<UserDto>(user);
        }

        protected List<UserDto> GetAllExecution()
        {
            using var context = new AppDbContext();

            var users = context.Users.ToList();

            return users.Select(u => _mapper.Map<UserDto>(u)).ToList();
        }

        protected ActionResponse UpdateProfileExecution(int id, UpdateUserProfileDto dto)
        {
            using var context = new AppDbContext();

            var user = context.Users.FirstOrDefault(u => u.Id == id);

            if (user == null)
                return ActionResponse.Fail("User not found.");

            user.Name = dto.Name;
            user.Phone = dto.Phone;

            context.SaveChanges();

            return ActionResponse.Ok("Profile updated successfully.");
        }

        protected ActionResponse BanExecution(int id, int currentUserId, UserRole currentUserRole)
        {
            using var context = new AppDbContext();

            var user = context.Users.FirstOrDefault(u => u.Id == id);

            if (user == null)
                return ActionResponse.Fail("User not found.");

            if (id == currentUserId)
                return ActionResponse.Fail("You cannot ban yourself.");

            if (user.Role >= currentUserRole)
                return ActionResponse.Fail("You cannot ban a user with equal or higher role.");

            if (user.IsBanned)
                return ActionResponse.Ok("User is already banned.");

            user.IsBanned = true;
            context.SaveChanges();

            return ActionResponse.Ok("User banned successfully.");
        }

        protected ActionResponse UnbanExecution(int id, int currentUserId, UserRole currentUserRole)
        {
            using var context = new AppDbContext();

            var user = context.Users.FirstOrDefault(u => u.Id == id);

            if (user == null)
                return ActionResponse.Fail("User not found.");

            if (id == currentUserId)
                return ActionResponse.Fail("You cannot unban yourself.");

            if (user.Role >= currentUserRole)
                return ActionResponse.Fail("You cannot unban a user with equal or higher role.");

            if (!user.IsBanned)
                return ActionResponse.Ok("User is not banned.");

            user.IsBanned = false;
            context.SaveChanges();

            return ActionResponse.Ok("User unbanned successfully.");
        }

        protected ActionResponse PromoteExecution(int id, int currentUserId, UserRole currentUserRole)
        {
            if (currentUserRole != UserRole.Owner)
                return ActionResponse.Fail("Insufficient rights.");

            using var context = new AppDbContext();

            var user = context.Users.FirstOrDefault(u => u.Id == id);

            if (user == null)
                return ActionResponse.Fail("User not found.");

            if (id == currentUserId)
                return ActionResponse.Fail("You cannot promote yourself.");

            if (user.Role == UserRole.Admin)
                return ActionResponse.Ok("User is already an Admin.");

            if (user.Role == UserRole.Owner)
                return ActionResponse.Fail("Cannot promote Owner.");

            user.Role = UserRole.Admin;
            context.SaveChanges();

            return ActionResponse.Ok("User promoted to Admin successfully.");
        }

        protected ActionResponse DemoteExecution(int id, int currentUserId, UserRole currentUserRole)
        {
            if (currentUserRole != UserRole.Owner)
                return ActionResponse.Fail("Insufficient rights.");

            using var context = new AppDbContext();

            var user = context.Users.FirstOrDefault(u => u.Id == id);

            if (user == null)
                return ActionResponse.Fail("User not found.");

            if (id == currentUserId)
                return ActionResponse.Fail("You cannot demote yourself.");

            if (user.Role == UserRole.Client)
                return ActionResponse.Ok("User is already a Client.");

            if (user.Role == UserRole.Owner)
                return ActionResponse.Fail("Cannot demote Owner.");

            user.Role = UserRole.Client;
            context.SaveChanges();

            return ActionResponse.Ok("User demoted to Client successfully.");
        }
    }
}
