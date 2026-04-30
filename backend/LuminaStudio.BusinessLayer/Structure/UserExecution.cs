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
        return ActionResponse.SafeExecute(() => UpdateProfileExecution(id, dto));
    }

    public ActionResponse Ban(int id, int currentUserId, UserRole currentUserRole)
    {
        return ActionResponse.SafeExecute(() => BanExecution(id, currentUserId, currentUserRole));
    }

    public ActionResponse Unban(int id, int currentUserId, UserRole currentUserRole)
    {
        return ActionResponse.SafeExecute(() => UnbanExecution(id, currentUserId, currentUserRole));
    }

    public ActionResponse Promote(int id, int currentUserId, UserRole currentUserRole)
    {
        return ActionResponse.SafeExecute(() => PromoteExecution(id, currentUserId, currentUserRole));
    }

    public ActionResponse Demote(int id, int currentUserId, UserRole currentUserRole)
    {
        return ActionResponse.SafeExecute(() => DemoteExecution(id, currentUserId, currentUserRole));
    }
}
