namespace LuminaStudio.Domain.Models.Responses;

public class ActionResponse
{
    public bool Success { get; set; }

    public string Message { get; set; } = string.Empty;

    public static ActionResponse Ok(string message = "") => new() { Success = true, Message = message };

    public static ActionResponse Fail(string message) => new() { Success = false, Message = message };
}
