namespace LuminaStudio.Domain.Settings
{
    public static class JwtSettings
    {
        public static string SecretKey { get; set; } = string.Empty;
        public static string Issuer { get; set; } = string.Empty;
        public static string Audience { get; set; } = string.Empty;
        public static int ExpiresInMinutes { get; set; } = 120;
    }
}
