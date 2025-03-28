using System;
using API.Data.Migrations;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Route("api/account")]
[ApiController]
public class AccountController(SignInManager<User> signInManager) : ControllerBase
{
    [HttpPost("register")]
    public async Task<ActionResult> Register(RegisterDto registerDto)
    {
        var user = new User
        {
            UserName = registerDto.Email,
            Email = registerDto.Email
        };

        var result = await signInManager.UserManager.CreateAsync(user, registerDto.Password);

        if (!result.Succeeded)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(error.Code, error.Description);
            }
            return ValidationProblem(ModelState);
        }

        await signInManager.UserManager.AddToRoleAsync(user, "Customer");

        return Ok();
    }

    // We do not want to make this endpoint a authorized endpoint
    // because we need the user info in front-end
    // but we do not know if the user's Cookie is still valid
    // and we do not want to pop a 401 error to the user
    // so we make this call silently if the user is not logged in or the cookie is invalid
    // [Authorize]
    [HttpGet("user-info")]
    public async Task<ActionResult> GetUserInfo()
    {
        if (User.Identity?.IsAuthenticated == false) return NoContent(); // 204 No Content

        var user = await signInManager.UserManager.GetUserAsync(User);

        if (user == null) return Unauthorized(); // 401 Unauthorized

        var roles = await signInManager.UserManager.GetRolesAsync(user);

        return Ok(new 
        { 
            user.Email,
            user.UserName,
            Roles = roles
        });
    }

    [HttpPost("logout")]
    public async Task<ActionResult> Logout()
    {
        // Sign out the user
        // This will clear the cookie
        await signInManager.SignOutAsync();

        return Ok();
    }

    [Authorize]
    [HttpPost("address")]
    public async Task<ActionResult<Address>> CreateOrUpdateUserAddress(Address address)
    {
        // simpler way to get the user
        // but query user data without eager loading
        // means if you are going to use user.Address
        // you could trigger aditional DB query
        // var user = await signInManager.UserManager.GetUserAsync(User);

        // query user data with eager loading
        var user = await signInManager.UserManager.Users
            .Include(u => u.Address)
            .FirstOrDefaultAsync(u => u.UserName == User.Identity.Name);

        if (user == null) return Unauthorized();

        user.Address = address;

        var result = await signInManager.UserManager.UpdateAsync(user);

        if (result.Succeeded) return Ok(user.Address);

        return BadRequest("Failed to create or update user address");
    }

    [Authorize]
    [HttpGet("address")]
    public async Task<ActionResult<Address>> GetUserAddress()
    {
        var user = await signInManager.UserManager.Users
            .Include(u => u.Address)
            .FirstOrDefaultAsync(u => u.UserName == User.Identity.Name);

        if (user == null) return Unauthorized();

        if (user.Address == null) return NoContent();

        return Ok(user.Address);
    }
}
