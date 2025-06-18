using backend.Data.Models;
using backend.DTOs;

namespace backend.Data.Mappers;

public static class UserMapper
{
    public static UserDto ToDto(this User user, IEnumerable<ExperienceDto>? experiences = null) =>
        new(
            Id: user.Id,
            Name: user.Name,
            BirthDate: user.BirthDate,
            Address: user.Address,
            Phone: user.Phone,
            LinkedInUrl: user.LinkedInUrl,
            Description: user.Description,
            University: user.University,
            Skills: ParseUserSkills(user.Skills),
            ImageUrl: user.ImageUrl,
            Experiences: experiences ?? new List<ExperienceDto>()
        );

    public static IEnumerable<Skill> ParseUserSkills(string skills) =>
        skills.Split(";").Select(skill => new Skill(Technology: skill));
}
