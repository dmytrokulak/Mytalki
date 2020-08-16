using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyTalki.Domain.Services;
using MyTalki.Web.Models;


namespace MyTalki.Web.Controllers
{
    [Route("api/account")]
    [Authorize]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _service;
        private readonly IMapper _mapper;

        public AccountController(IAccountService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }



        [HttpPatch("name")]
        public async Task ChangeNameAsync([FromBody] AccountChangeNameModel model)
        {
            var id = int.Parse(HttpContext.User.FindFirst(c => c.Type == ClaimTypes.Sid).Value);
            await _service.ChangeNameAsync(id, model.FirstName, model.LastName);
        }
    }
}
