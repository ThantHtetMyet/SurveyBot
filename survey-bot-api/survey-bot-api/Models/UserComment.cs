namespace survey_bot_api.Models;

public class UserComment
{
    public Guid ID { get; set; }
    public string UserName { get; set; } = string.Empty;
    public string? Email { get; set; }
    public string? UsageWithoutAttachment { get; set; }
    public string? UsageWithAttachment { get; set; }
    public string? Department { get; set; }
    public string? Section { get; set; }
    public string? Remark { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? UpdatedDate { get; set; }
}

