using LuminaStudio.Domain.Enums;
using LuminaStudio.Domain.Models.Responses;
using LuminaStudio.Domain.Models.User;

namespace LuminaStudio.BusinessLayer.Interfaces
{
    public interface IUserActions
    {
        UserDto? GetById(int id);
        List<UserDto> GetAll();
        ActionResponse UpdateProfile(int id, UpdateUserProfileDto dto);
        ActionResponse Ban(int id, int currentUserId, UserRole currentUserRole);
        ActionResponse Unban(int id, int currentUserId, UserRole currentUserRole);
        ActionResponse Promote(int id, int currentUserId, UserRole currentUserRole);
        ActionResponse Demote(int id, int currentUserId, UserRole currentUserRole);
    }
}
