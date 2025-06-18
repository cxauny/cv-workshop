using backend.Data.Models;

namespace backend.DTOs;

public record UserDto(
    Guid Id,
    string Name,
    DateTime BirthDate,
    string Address,
    string Phone,
    string? LinkedInUrl,
    string Description,
    string University,
    IEnumerable<Skill> Skills,
    string? ImageUrl,
    IEnumerable<ExperienceDto> Experiences
);
