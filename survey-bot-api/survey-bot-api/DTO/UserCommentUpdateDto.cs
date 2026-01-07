using System.ComponentModel.DataAnnotations;

namespace survey_bot_api.DTO;

public class UserCommentUpdateDto
{
    [Required]
    [MaxLength(200)]
    public string UserName { get; set; } = string.Empty;

    [MaxLength(200)]
    public string? Email { get; set; }

    public string? UsageWithoutAttachment { get; set; }

    public string? UsageWithAttachment { get; set; }

    [MaxLength(500)]
    public string? Department { get; set; }

    [MaxLength(500)]
    public string? Section { get; set; }

    [MaxLength(200)]
    public string? Remark { get; set; }
}

