using AutoMapper;
using LuminaStudio.BusinessLayer.Interfaces;
using LuminaStudio.Domain.Enums;
using LuminaStudio.Domain.Models.Responses;
using LuminaStudio.Domain.Models.User;

namespace LuminaStudio.BusinessLayer.Structure;

public class UserExecution : IUserActions
{
    private readonly IMapper _mapper;

    public UserExecution(IMapper mapper)
    {
        _mapper = mapper;
    }

    public UserDto? GetById(int id) => throw new NotImplementedException();
    public List<UserDto> GetAll() => throw new NotImplementedException();
    public ActionResponse UpdateProfile(int id, UpdateUserProfileDto dto) => throw new NotImplementedException();
    public ActionResponse Ban(int id, int currentUserId, UserRole currentUserRole) => throw new NotImplementedException();
    public ActionResponse Unban(int id, int currentUserId, UserRole currentUserRole) => throw new NotImplementedException();
    public ActionResponse Promote(int id, int currentUserId, UserRole currentUserRole) => throw new NotImplementedException();
    public ActionResponse Demote(int id, int currentUserId, UserRole currentUserRole) => throw new NotImplementedException();
}
