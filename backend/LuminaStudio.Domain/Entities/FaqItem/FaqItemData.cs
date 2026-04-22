using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LuminaStudio.Domain.Entities.FaqItem;

public class FaqItemData
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    [StringLength(250, MinimumLength = 5)]
    public string Question { get; set; } = string.Empty;

    [Required]
    [StringLength(2000, MinimumLength = 5)]
    public string Answer { get; set; } = string.Empty;

    public int DisplayOrder { get; set; }

    public bool IsActive { get; set; } = true;

    [DataType(DataType.DateTime)]
    public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
}
