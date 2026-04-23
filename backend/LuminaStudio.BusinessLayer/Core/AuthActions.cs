using AutoMapper;
using LuminaStudio.DataAccessLayer.Context;
using LuminaStudio.Domain.Entities.User;
using LuminaStudio.Domain.Models.Auth;
using LuminaStudio.Domain.Models.Responses;
using LuminaStudio.Domain.Models.User;
using LuminaStudio.Domain.Settings;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace LuminaStudio.BusinessLayer.Core
{
    public class AuthActions
    {
        protected readonly IMapper _mapper;

        protected AuthActions(IMapper mapper)
        {
            _mapper = mapper;
        }

        protected string GenerateToken(UserData user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Role, user.Role.ToString())
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(JwtSettings.SecretKey));

            var token = new JwtSecurityToken(
                issuer: JwtSettings.Issuer,
                audience: JwtSettings.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(JwtSettings.ExpiresInMinutes),
                signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        protected (LoginResponseDto? Data, string? Error) LoginExecution(UserLoginDto dto)
        {
            using var context = new AppDbContext();

            var user = context.Users.FirstOrDefault(u => u.Email == dto.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                return (null, "Invalid email or password.");

            if (user.IsBanned)
                return (null, "Your account has been banned.");

            var token = GenerateToken(user);

            user.LastLoginAt = DateTime.UtcNow;
            context.SaveChanges();

            var userDto = _mapper.Map<UserDto>(user);

            return (new LoginResponseDto
            {
                Token = token,
                User = userDto,
                ExpiresAt = DateTime.UtcNow.AddMinutes(JwtSettings.ExpiresInMinutes)
            }, null);
        }

        protected ActionResponse RegisterExecution(UserRegisterDto dto)
        {
            using var context = new AppDbContext();

            if (context.Users.Any(u => u.Email == dto.Email))
                return ActionResponse.Fail("Email already exists.");

            var user = _mapper.Map<UserData>(dto);
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

            context.Users.Add(user);
            context.SaveChanges();

            return ActionResponse.Ok("Registration successful.");
        }
    }
}
