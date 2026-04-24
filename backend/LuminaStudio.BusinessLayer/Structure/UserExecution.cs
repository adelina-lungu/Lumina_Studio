using AutoMapper;
using LuminaStudio.BusinessLayer.Core;
using LuminaStudio.BusinessLayer.Interfaces;
using LuminaStudio.Domain.Enums;
using LuminaStudio.Domain.Models.Responses;
using LuminaStudio.Domain.Models.User;

namespace LuminaStudio.BusinessLayer.Structure;

public class UserExecution : UserActions, IUserActions
{
    public UserExecution(IMapper mapper) : base(mapper) {}

    public UserDto? GetById(int id)
    {
        return GetByIdExecution(id);
    }

    public List<UserDto> GetAll()
    {
        return GetAllExecution();
    }

    public ActionResponse UpdateProfile(int id, UpdateUserProfileDto dto)
    {
        return UpdateProfileExecution(id, dto);
    }

    public ActionResponse Ban(int id, int currentUserId, UserRole currentUserRole)
    {
        return BanExecution(id, currentUserId, currentUserRole);
    }

    public ActionResponse Unban(int id, int currentUserId, UserRole currentUserRole)
    {
        return UnbanExecution(id, currentUserId, currentUserRole);
    }

    public ActionResponse Promote(int id, int currentUserId, UserRole currentUserRole)
    {
        return PromoteExecution(id, currentUserId, currentUserRole);
    }

    public ActionResponse Demote(int id, int currentUserId, UserRole currentUserRole)
    {
        return DemoteExecution(id, currentUserId, currentUserRole);
    }
}
