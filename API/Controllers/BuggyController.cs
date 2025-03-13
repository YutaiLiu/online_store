using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/buggy")]
    [ApiController]
    public class BuggyController : ControllerBase
    {
        [HttpGet("not-found")]
        public ActionResult GetNotFoundResponse()
        {
            return NotFound();
        }

        [HttpGet("server-error")]
        public ActionResult GetServerErrorResponse()
        {
            // in dev enviroment, we can choose to return the stack trace, like this:
            throw new Exception("Server error occurred");
            // in production, we can choose to only return a generic message to client, like this:
            // return StatusCode(StatusCodes.Status500InternalServerError);
        }

        [HttpGet("bad-request")]
        public ActionResult GetBadRequestResponse()
        {
            // this will not return the error in validation
            // return BadRequest("This was a bad request");
            
            // this will return the error in validation
            ModelState.AddModelError("Error 1: ", "First validation error");
            ModelState.AddModelError("Error 2: ", "Second validation error");
            
            return ValidationProblem();
        }

        [HttpGet("unauthorized")]
        public ActionResult GetUnauthorizedResponse()
        {
            return Unauthorized();
        }
    }
}
