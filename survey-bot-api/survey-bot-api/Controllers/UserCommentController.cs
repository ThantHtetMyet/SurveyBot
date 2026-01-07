using Microsoft.AspNetCore.Mvc;
using Dapper;
using Microsoft.Data.SqlClient;
using survey_bot_api.Models;
using survey_bot_api.DTO;
using survey_bot_api.Services;
using System.Data;

namespace survey_bot_api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserCommentController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly string _connectionString;
    private readonly IFileLoggerService _logger;

    public UserCommentController(IConfiguration configuration, IFileLoggerService logger)
    {
        _configuration = configuration;
        _connectionString = _configuration.GetConnectionString("DefaultConnection") 
            ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
        _logger = logger;
    }

    private static DateTime GetSingaporeTime()
    {
        try
        {
            // Try Windows timezone ID first
            var timeZone = TimeZoneInfo.FindSystemTimeZoneById("Singapore Standard Time");
            return TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, timeZone);
        }
        catch
        {
            try
            {
                // Try Linux/Mac timezone ID
                var timeZone = TimeZoneInfo.FindSystemTimeZoneById("Asia/Singapore");
                return TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, timeZone);
            }
            catch
            {
                // Fallback: Singapore is UTC+8
                return DateTime.UtcNow.AddHours(8);
            }
        }
    }

    // GET: api/UserComment
    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserComment>>> GetAll()
    {
        try
        {
            _logger.LogTransaction("GET_ALL", "Retrieving all user comments");
            
            using var connection = new SqlConnection(_connectionString);
            var query = @"
                SELECT ID, UserName, Email, UsageWithoutAttachment, UsageWithAttachment, 
                       Department, Section, Remark, IsDeleted, CreatedDate, UpdatedDate
                FROM UserComment
                WHERE IsDeleted = 0
                ORDER BY CreatedDate DESC";

            var comments = await connection.QueryAsync<UserComment>(query);
            var count = comments.Count();
            
            _logger.LogTransaction("GET_ALL", $"Successfully retrieved {count} user comment(s)");
            return Ok(comments);
        }
        catch (Exception ex)
        {
            _logger.LogError("An error occurred while retrieving user comments", ex);
            return StatusCode(500, new { message = "An error occurred while retrieving user comments.", error = ex.Message });
        }
    }

    // GET: api/UserComment/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<UserComment>> GetById(Guid id)
    {
        try
        {
            _logger.LogTransaction("GET_BY_ID", $"Retrieving user comment with ID: {id}");
            
            using var connection = new SqlConnection(_connectionString);
            var query = @"
                SELECT ID, UserName, Email, UsageWithoutAttachment, UsageWithAttachment, 
                       Department, Section, Remark, IsDeleted, CreatedDate, UpdatedDate
                FROM UserComment
                WHERE ID = @Id AND IsDeleted = 0";

            var comment = await connection.QueryFirstOrDefaultAsync<UserComment>(query, new { Id = id });

            if (comment == null)
            {
                _logger.LogWarning($"User comment not found with ID: {id}");
                return NotFound(new { message = "User comment not found." });
            }

            _logger.LogTransaction("GET_BY_ID", $"Successfully retrieved user comment with ID: {id}");
            return Ok(comment);
        }
        catch (Exception ex)
        {
            _logger.LogError($"An error occurred while retrieving user comment with ID: {id}", ex);
            return StatusCode(500, new { message = "An error occurred while retrieving the user comment.", error = ex.Message });
        }
    }

    // POST: api/UserComment
    [HttpPost]
    public async Task<ActionResult<UserComment>> Create([FromBody] UserCommentCreateDto dto)
    {
        try
        {
            _logger.LogTransaction("CREATE", $"Creating new user comment for UserName: {dto.UserName}, Email: {dto.Email ?? "N/A"}");
            
            var userComment = new UserComment
            {
                ID = Guid.NewGuid(),
                UserName = dto.UserName,
                Email = dto.Email,
                UsageWithoutAttachment = dto.UsageWithoutAttachment,
                UsageWithAttachment = dto.UsageWithAttachment,
                Department = dto.Department,
                Section = dto.Section,
                Remark = dto.Remark,
                IsDeleted = false,
                CreatedDate = GetSingaporeTime(),
                UpdatedDate = null
            };

            using var connection = new SqlConnection(_connectionString);
            var query = @"
                INSERT INTO UserComment (ID, UserName, Email, UsageWithoutAttachment, UsageWithAttachment, 
                                       Department, Section, Remark, IsDeleted, CreatedDate, UpdatedDate)
                VALUES (@ID, @UserName, @Email, @UsageWithoutAttachment, @UsageWithAttachment, 
                       @Department, @Section, @Remark, @IsDeleted, @CreatedDate, @UpdatedDate)";

            await connection.ExecuteAsync(query, userComment);

            _logger.LogTransaction("CREATE", $"Successfully created user comment with ID: {userComment.ID}");
            return CreatedAtAction(nameof(GetById), new { id = userComment.ID }, userComment);
        }
        catch (Exception ex)
        {
            _logger.LogError($"An error occurred while creating user comment for UserName: {dto.UserName}", ex);
            return StatusCode(500, new { message = "An error occurred while creating the user comment.", error = ex.Message });
        }
    }

    // PUT: api/UserComment/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UserCommentUpdateDto dto)
    {
        try
        {
            _logger.LogTransaction("UPDATE", $"Updating user comment with ID: {id}, UserName: {dto.UserName}");
            
            using var connection = new SqlConnection(_connectionString);
            
            // Check if the record exists
            var checkQuery = "SELECT COUNT(1) FROM UserComment WHERE ID = @Id AND IsDeleted = 0";
            var exists = await connection.ExecuteScalarAsync<int>(checkQuery, new { Id = id });

            if (exists == 0)
            {
                _logger.LogWarning($"User comment not found for update with ID: {id}");
                return NotFound(new { message = "User comment not found." });
            }

            var query = @"
                UPDATE UserComment
                SET UserName = @UserName,
                    Email = @Email,
                    UsageWithoutAttachment = @UsageWithoutAttachment,
                    UsageWithAttachment = @UsageWithAttachment,
                    Department = @Department,
                    Section = @Section,
                    Remark = @Remark,
                    UpdatedDate = @UpdatedDate
                WHERE ID = @Id AND IsDeleted = 0";

            await connection.ExecuteAsync(query, new
            {
                Id = id,
                dto.UserName,
                dto.Email,
                dto.UsageWithoutAttachment,
                dto.UsageWithAttachment,
                dto.Department,
                dto.Section,
                dto.Remark,
                UpdatedDate = GetSingaporeTime()
            });

            _logger.LogTransaction("UPDATE", $"Successfully updated user comment with ID: {id}");
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError($"An error occurred while updating user comment with ID: {id}", ex);
            return StatusCode(500, new { message = "An error occurred while updating the user comment.", error = ex.Message });
        }
    }

    // DELETE: api/UserComment/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        try
        {
            _logger.LogTransaction("DELETE", $"Deleting (soft delete) user comment with ID: {id}");
            
            using var connection = new SqlConnection(_connectionString);
            
            // Soft delete
            var query = @"
                UPDATE UserComment
                SET IsDeleted = 1, UpdatedDate = @UpdatedDate
                WHERE ID = @Id AND IsDeleted = 0";

            var rowsAffected = await connection.ExecuteAsync(query, new { Id = id, UpdatedDate = GetSingaporeTime() });

            if (rowsAffected == 0)
            {
                _logger.LogWarning($"User comment not found for deletion with ID: {id}");
                return NotFound(new { message = "User comment not found." });
            }

            _logger.LogTransaction("DELETE", $"Successfully deleted (soft delete) user comment with ID: {id}");
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError($"An error occurred while deleting user comment with ID: {id}", ex);
            return StatusCode(500, new { message = "An error occurred while deleting the user comment.", error = ex.Message });
        }
    }
}

