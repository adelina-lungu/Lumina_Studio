using AutoMapper;
using LuminaStudio.DataAccessLayer.Context;
using LuminaStudio.Domain.Entities.ServicePackage;
using LuminaStudio.Domain.Models.Responses;
using LuminaStudio.Domain.Models.ServicePackage;
using Microsoft.EntityFrameworkCore;

namespace LuminaStudio.BusinessLayer.Core
{
    public class ServicePackageActions
    {
        protected readonly IMapper _mapper;

        protected ServicePackageActions(IMapper mapper)
        {
            _mapper = mapper;
        }

        protected ServicePackageDto? GetByIdExecution(int id)
        {
            using var context = new AppDbContext();

            var package = context.ServicePackages
                .Include(sp => sp.Features)
                .FirstOrDefault(sp => sp.Id == id);

            if (package == null)
                return null;

            return _mapper.Map<ServicePackageDto>(package);
        }

        protected ServicePackageDto? GetBySlugExecution(string slug)
        {
            using var context = new AppDbContext();

            var package = context.ServicePackages
                .Include(sp => sp.Features)
                .FirstOrDefault(sp => sp.Slug == slug);

            if (package == null)
                return null;

            return _mapper.Map<ServicePackageDto>(package);
        }

        protected List<ServicePackageDto> GetAllExecution()
        {
            using var context = new AppDbContext();

            var packages = context.ServicePackages
                .Include(sp => sp.Features)
                .Where(sp => sp.IsActive)
                .OrderBy(sp => sp.DisplayOrder)
                .ToList();

            return packages.Select(sp => _mapper.Map<ServicePackageDto>(sp)).ToList();
        }

        protected List<ServicePackageDto> GetAllAdminExecution()
        {
            using var context = new AppDbContext();

            var packages = context.ServicePackages
                .Include(sp => sp.Features)
                .OrderBy(sp => sp.DisplayOrder)
                .ToList();

            return packages.Select(sp => _mapper.Map<ServicePackageDto>(sp)).ToList();
        }

        protected ActionResponse CreateExecution(CreateServicePackageDto dto)
        {
            using var context = new AppDbContext();

            var slug = dto.Name.ToLower().Replace(" ", "-");

            var existing = context.ServicePackages.Any(sp => sp.Slug == slug);
            if (existing)
                return ActionResponse.Fail("A package with this name already exists.");

            var package = new ServicePackageData
            {
                Slug = slug,
                Tier = dto.Tier,
                Name = dto.Name,
                Price = dto.Price,
                Currency = dto.Currency,
                IsHighlighted = dto.IsHighlighted,
                IsActive = true,
                DisplayOrder = dto.DisplayOrder
            };

            context.ServicePackages.Add(package);
            context.SaveChanges();

            for (int i = 0; i < dto.Features.Count; i++)
            {
                context.ServicePackageFeatures.Add(new ServicePackageFeatureData
                {
                    PackageId = package.Id,
                    Text = dto.Features[i],
                    DisplayOrder = i
                });
            }

            context.SaveChanges();

            return ActionResponse.Ok("Service package created successfully.");
        }

        protected ActionResponse UpdateExecution(int id, UpdateServicePackageDto dto)
        {
            using var context = new AppDbContext();

            var package = context.ServicePackages
                .Include(sp => sp.Features)
                .FirstOrDefault(sp => sp.Id == id);

            if (package == null)
                return ActionResponse.Fail("Service package not found.");

            package.Tier = dto.Tier;
            package.Name = dto.Name;
            package.Price = dto.Price;
            package.Currency = dto.Currency;
            package.IsHighlighted = dto.IsHighlighted;
            package.IsActive = dto.IsActive;
            package.DisplayOrder = dto.DisplayOrder;

            context.ServicePackageFeatures.RemoveRange(package.Features);

            for (int i = 0; i < dto.Features.Count; i++)
            {
                context.ServicePackageFeatures.Add(new ServicePackageFeatureData
                {
                    PackageId = package.Id,
                    Text = dto.Features[i],
                    DisplayOrder = i
                });
            }

            context.SaveChanges();

            return ActionResponse.Ok("Service package updated successfully.");
        }

        protected ActionResponse DeleteExecution(int id)
        {
            using var context = new AppDbContext();

            var package = context.ServicePackages
                .Include(sp => sp.Bookings)
                .Include(sp => sp.Features)
                .FirstOrDefault(sp => sp.Id == id);

            if (package == null)
                return ActionResponse.Fail("Service package not found.");

            if (package.Bookings.Any())
                return ActionResponse.Fail("Cannot delete package with existing bookings.");

            context.ServicePackageFeatures.RemoveRange(package.Features);
            context.ServicePackages.Remove(package);
            context.SaveChanges();

            return ActionResponse.Ok("Service package deleted successfully.");
        }
    }
}
