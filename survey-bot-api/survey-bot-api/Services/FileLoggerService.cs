using System.Diagnostics;
using System.Runtime.CompilerServices;

namespace survey_bot_api.Services;

public interface IFileLoggerService
{
    void LogInfo(string message, [CallerMemberName] string memberName = "", [CallerFilePath] string filePath = "", [CallerLineNumber] int lineNumber = 0);
    void LogWarning(string message, [CallerMemberName] string memberName = "", [CallerFilePath] string filePath = "", [CallerLineNumber] int lineNumber = 0);
    void LogError(string message, Exception? exception = null, [CallerMemberName] string memberName = "", [CallerFilePath] string filePath = "", [CallerLineNumber] int lineNumber = 0);
    void LogTransaction(string action, string details, [CallerMemberName] string memberName = "", [CallerFilePath] string filePath = "", [CallerLineNumber] int lineNumber = 0);
}

public class FileLoggerService : IFileLoggerService
{
    private readonly string _logsDirectory;
    private readonly object _lockObject = new object();

    public FileLoggerService(IConfiguration configuration)
    {
        var logsDir = configuration["LogsDirectory"] ?? "Logs";
        _logsDirectory = Path.Combine(Directory.GetCurrentDirectory(), logsDir);
        
        // Ensure logs directory exists
        if (!Directory.Exists(_logsDirectory))
        {
            Directory.CreateDirectory(_logsDirectory);
        }
    }

    private string GetLogFilePath()
    {
        var fileName = $"log_{DateTime.Now:yyyy-MM-dd}.txt";
        return Path.Combine(_logsDirectory, fileName);
    }

    private string GetFileName(string fullPath)
    {
        return Path.GetFileName(fullPath);
    }

    private void WriteLog(string level, string message, string memberName, string filePath, int lineNumber, Exception? exception = null)
    {
        lock (_lockObject)
        {
            try
            {
                var logFilePath = GetLogFilePath();
                var timestamp = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss.fff");
                var fileName = GetFileName(filePath);
                
                var logEntry = $"[{timestamp}] [{level}] [{fileName}:{lineNumber}] [{memberName}] {message}";

                if (exception != null)
                {
                    logEntry += $"\nException: {exception.GetType().Name}";
                    logEntry += $"\nMessage: {exception.Message}";
                    
                    if (exception.StackTrace != null)
                    {
                        logEntry += $"\nStack Trace:\n{exception.StackTrace}";
                    }
                    
                    // Include inner exception if present
                    if (exception.InnerException != null)
                    {
                        logEntry += $"\nInner Exception: {exception.InnerException.GetType().Name}";
                        logEntry += $"\nInner Message: {exception.InnerException.Message}";
                        if (exception.InnerException.StackTrace != null)
                        {
                            logEntry += $"\nInner Stack Trace:\n{exception.InnerException.StackTrace}";
                        }
                    }
                }

                logEntry += "\n" + new string('-', 80) + "\n";

                File.AppendAllText(logFilePath, logEntry);
            }
            catch (Exception ex)
            {
                // Fallback to console if file logging fails
                Console.WriteLine($"Failed to write to log file: {ex.Message}");
                Console.WriteLine($"Original log: [{level}] {message}");
            }
        }
    }

    public void LogInfo(string message, [CallerMemberName] string memberName = "", [CallerFilePath] string filePath = "", [CallerLineNumber] int lineNumber = 0)
    {
        WriteLog("INFO", message, memberName, filePath, lineNumber);
    }

    public void LogWarning(string message, [CallerMemberName] string memberName = "", [CallerFilePath] string filePath = "", [CallerLineNumber] int lineNumber = 0)
    {
        WriteLog("WARNING", message, memberName, filePath, lineNumber);
    }

    public void LogError(string message, Exception? exception = null, [CallerMemberName] string memberName = "", [CallerFilePath] string filePath = "", [CallerLineNumber] int lineNumber = 0)
    {
        WriteLog("ERROR", message, memberName, filePath, lineNumber, exception);
    }

    public void LogTransaction(string action, string details, [CallerMemberName] string memberName = "", [CallerFilePath] string filePath = "", [CallerLineNumber] int lineNumber = 0)
    {
        var message = $"TRANSACTION - {action}: {details}";
        WriteLog("TRANSACTION", message, memberName, filePath, lineNumber);
    }
}

