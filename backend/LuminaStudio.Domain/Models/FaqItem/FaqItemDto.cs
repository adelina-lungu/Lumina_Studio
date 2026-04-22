namespace LuminaStudio.Domain.Models.FaqItem;

public class FaqItemDto
{
    public int Id { get; set; }

    public string Question { get; set; } = string.Empty;

    public string Answer { get; set; } = string.Empty;

    public int DisplayOrder { get; set; }

    public bool IsActive { get; set; }
}
