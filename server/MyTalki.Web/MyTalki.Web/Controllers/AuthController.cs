using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MyTalki.Domain.Services;
using Microsoft.Extensions.Configuration;
using MyTalki.Web.Models;


namespace MyTalki.Web.Controllers
{
    [Route("api")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _service;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;

        public AuthController(IAuthService service, IConfiguration configuration, IMapper mapper)
        {
            _service = service;
            _configuration = configuration;
            _mapper = mapper;
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
                return Ok(token);
            }

            return BadRequest();
        }

        [HttpGet("user")]
        public async Task<UserModel> GetCurrentUser()
        {
            Request.Headers.TryGetValue("Authorization", out var value);
            var entity = await _service.GetCurrentUserAsync(value[0].Split(' ')[1]);
            return _mapper.Map<UserModel>(entity);
        }
    }
}
