using backend.Data.Mappers;
using backend.Data.Requests;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Endpoints;

public static class UserEndpoints
{
    public static void MapUserEndpoints(this WebApplication app)
    {
        // GET /users
        app.MapGet(
                "/users",
                async (ICvService cvService) =>
                {
                    var users = await cvService.GetAllUsersAsync();
                    var userDtos = users.Select(u => u.ToDto()).ToList();

                    return Results.Ok(userDtos);
                }
            )
            .WithName("GetAllUsers")
            .WithTags("Users");

        // GET /users/{id}
        app.MapGet(
                "/users/{id:guid}",
                async (Guid id, ICvService cvService) =>
                {
                    var user = await cvService.GetUserByIdAsync(id);
                    var userDto = user.ToDto();

                    return Results.Ok(userDto);
                }
            )
            .WithName("GetUserById")
            .WithTags("Users");

        // POST /users/skills
        app.MapPost(
                "/users/skills",
                async (SkillRequest skillRequest, ICvService cvService) =>
                {
                    var users = await cvService.GetUsersWithDesiredSkillAsync(
                        skillRequest.WantedSkills
                    );
                    var userDtos = users.Select(u => u.ToDto()).ToList();

                    return Results.Ok(userDtos);
                }
            )
            .WithName("GetUsersWithDesiredSkill")
            .WithTags("Users");
    }
}
