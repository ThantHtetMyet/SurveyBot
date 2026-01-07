using survey_bot_api.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register File Logger Service
builder.Services.AddSingleton<IFileLoggerService, FileLoggerService>();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins(
                    "http://192.3.62.144:7002", // React app URL
                    "http://192.3.62.144:7001", // API URL (same-origin)
                    "http://localhost:5001",
                    "http://localhost:8080",
                    "http://localhost:3000",
                    "https://localhost:7145"
                )
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
// Enable Swagger in all environments (or use appsettings.json to control)
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Survey Bot API V1");
    c.RoutePrefix = "swagger";
});

app.UseHttpsRedirection();

// Use CORS before UseAuthorization
app.UseCors("AllowReactApp");

app.UseAuthorization();

app.MapControllers();

app.Run();
