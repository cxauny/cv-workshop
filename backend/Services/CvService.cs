using backend.Data;
using backend.Data.Mappers;
using backend.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class CvService(AppDbContext context) : ICvService
{
    // Users
    public async Task<IEnumerable<User>> GetAllUsersAsync()
    {
        return await context.Users.OrderBy(u => u.Name).ToListAsync();
    }

    public async Task<User?> GetUserByIdAsync(Guid id)
    {
        return await context.Users.FindAsync(id);
    }

    public async Task<IEnumerable<User>> GetUsersWithDesiredSkillAsync(
        IEnumerable<string> desiredSkills
    )
    {
        var allUsers = await GetAllUsersAsync();

        return allUsers.Where(user =>
            UserMapper
                .ParseUserSkills(user.Skills)
                .Any(skill =>
                    desiredSkills
                        .Select(skill => skill.ToLower())
                        .Contains(skill.Technology.ToLower())
                )
        );
    }

    // Experiences
    public async Task<IEnumerable<Experience>> GetAllExperiencesAsync()
    {
        return await context.Experiences.OrderBy(e => e.StartDate).ToListAsync();
    }

    public async Task<Experience?> GetExperienceByIdAsync(Guid id)
    {
        return await context.Experiences.FindAsync(id);
    }

    public async Task<IEnumerable<Experience>> GetExperiencesByTypeAsync(string type)
    {
        return await context
            .Experiences.Where(e => e.Type == type)
            .OrderBy(e => e.StartDate)
            .ToListAsync();
    }
}
