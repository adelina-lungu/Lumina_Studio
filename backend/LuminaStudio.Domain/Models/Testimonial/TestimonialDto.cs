namespace LuminaStudio.Domain.Models.Testimonial;

public class TestimonialDto
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Role { get; set; } = string.Empty;

    public string AvatarUrl { get; set; } = string.Empty;

    public string Text { get; set; } = string.Empty;

    public int Rating { get; set; }

    public bool IsApproved { get; set; }

    public DateTime CreatedOn { get; set; }
}
