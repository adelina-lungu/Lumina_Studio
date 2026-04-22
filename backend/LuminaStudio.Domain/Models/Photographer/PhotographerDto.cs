namespace LuminaStudio.Domain.Models.Photographer;

public class PhotographerDto
{
    public int Id { get; set; }

    public string Slug { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public string Specialty { get; set; } = string.Empty;

    public string Bio { get; set; } = string.Empty;

    public string AvatarUrl { get; set; } = string.Empty;

    public string CoverUrl { get; set; } = string.Empty;

    public string? InstagramUrl { get; set; }

    public string? FacebookUrl { get; set; }

    public string? WebsiteUrl { get; set; }

    public bool IsActive { get; set; }

    public int DisplayOrder { get; set; }

    public List<string> BusyDates { get; set; } = new();
}
