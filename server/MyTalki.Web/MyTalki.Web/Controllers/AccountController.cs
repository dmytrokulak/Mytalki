using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MyTalki.Domain.Services;
using MyTalki.Web.Models;


namespace MyTalki.Web.Controllers
{
    [Route("api/account")]
    [Authorize]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly IAuthService _authService;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public AccountController(IAccountService service, IMapper mapper, IAuthService authService, IConfiguration configuration)
        {
            _accountService = service;
            _mapper = mapper;
            _authService = authService;
            _configuration = configuration;
        }



        [HttpPatch("name")]
        public async Task ChangeNameAsync([FromBody] AccountChangeNameModel model)
        {
            var id = int.Parse(HttpContext.User.FindFirst(c => c.Type == ClaimTypes.Sid).Value);
            await _accountService.ChangeNameAsync(id, model.FirstName, model.LastName);
        }

        [HttpPatch("email")]
        public async Task ChangeEmailAsync([FromBody] AccountChangeEmailModel model)
        {
            var id = int.Parse(HttpContext.User.FindFirst(c => c.Type == ClaimTypes.Sid).Value);
            await _authService.ChangeEmailAsync(id, model.Email);
        }

        [HttpPatch("password")]
        public async Task ChangePasswordAsync([FromBody] AccountChangePasswordModel model)
        {
            var id = int.Parse(HttpContext.User.FindFirst(c => c.Type == ClaimTypes.Sid).Value);
            await _authService.ChangePasswordAsync(id, model.OldPassword, model.NewPassword, _configuration["ServerSecret"]);
        }

        [HttpPatch("timezone")]
        public async Task ChangeTImezoneAsync([FromBody] AccountChangeTimezoneModel model)
        {
            var id = int.Parse(HttpContext.User.FindFirst(c => c.Type == ClaimTypes.Sid).Value);
            await _accountService.ChangeTimezoneAsync(id, model.Timezone);
        }
    }
}
