using System.Runtime.InteropServices.WindowsRuntime;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MyTalki.Domain.Services;
using Microsoft.Extensions.Configuration;
using MyTalki.Web.Models;


namespace MyTalki.Web.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _service;
        private readonly IConfiguration _configuration;

        public AuthController(IAuthService service, IConfiguration configuration)
        {
            _service = service;
            _configuration = configuration;
        }



        [HttpPost("register")]
        public async Task< ActionResult> RegisterAsync([FromBody] RegisterModel model)
        {
            var token = await _service.RegisterAsync(model.Email, model.Password, _configuration["ServerSecret"],
                model.FirstName, model.LastName);
            if (token != null)
            {
                Response.Headers.Add("Authorization", "Bearer " + token);
                return Ok();
            }

            return BadRequest();
        }


        [HttpPost("login")]
        public async Task<ActionResult> LoginAsync([FromBody] LoginModel model)
        {
            var token = await _service.LoginAsync(model.Email, model.Password, _configuration["ServerSecret"]);
            if (token != null)
            {
                Response.Headers.Add("Authorization", "Bearer " + token);
                return Ok();
            }

            return BadRequest();
        }
    }
}
