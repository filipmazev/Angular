global using dotnet_rpg.Models;
global using dotnet_rpg.Services.CharacterService;
global using dotnet_rpg.DTOs.Character;
global using Microsoft.EntityFrameworkCore;
global using AutoMapper;
global using dotnet_rpg.Data;
global using dotnet_rpg.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Add connection string to the database
builder.Services.AddDbContext<DataContext>(options => {
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

//Register AutoMapper, add mapping profiles
builder.Services.AddAutoMapper(typeof(Program).Assembly);

//Here we add all services that we created
//AddScoped - one instance for each request
//AddTransient - one instance for each request
//AddSingleton - one instance for all requests
builder.Services.AddScoped<ICharacterService, CharacterService>();

//Register the repository
builder.Services.AddScoped<IRepository<Character>, Repository<Character>>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
