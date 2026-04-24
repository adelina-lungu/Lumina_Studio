using System.ComponentModel.DataAnnotations;

namespace LuminaStudio.Domain.Models.Photographer;

public class CreatePhotographerDto
{
    [Required]
    [StringLength(80)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [StringLength(120)]
    public string Specialty { get; set; } = string.Empty;

    [StringLength(1500)]
    public string Bio { get; set; } = string.Empty;

    [Required]
    [DataType(DataType.Url)]
    [StringLength(500)]
    public string AvatarUrl { get; set; } = string.Empty;

    [DataType(DataType.Url)]
    [StringLength(500)]
    public string CoverUrl { get; set; } = string.Empty;

    [DataType(DataType.Url)]
    [StringLength(250)]
    public string? InstagramUrl { get; set; }

    [DataType(DataType.Url)]
    [StringLength(250)]
    public string? FacebookUrl { get; set; }

    [DataType(DataType.Url)]
    [StringLength(250)]
    public string? WebsiteUrl { get; set; }

    public int DisplayOrder { get; set; }
}
