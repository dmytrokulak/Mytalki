using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyTalki.Domain.Entities;
using MyTalki.Domain.Queries;
using MyTalki.Domain.Services;
using MyTalki.Web.Models;

namespace MyTalki.Web.Controllers
{
    /// <summary>
    /// Controller to manage lesson type entities.
    /// </summary>
    [Route("api/booking")]
    [Authorize]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IBookingService _bookingService;
        private readonly IAuthService _authService;

        /// <summary>
        /// Controller to manage lesson type entities.
        /// </summary>
        /// <param name="mapper"></param>
        public BookingController(IMapper mapper, IBookingService service, IAuthService authService)
        {
            _mapper = mapper;
            _bookingService = service;
            _authService = authService;
        }

        
        /// <summary>
        /// Creates a new lesson type in the system.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<LessonModel> PostAsync([FromBody] BookRequestModel model)
        {
            //ToDo:: var sid =  Request.HttpContext.User.FindFirst(p => p.Type == "sid").Value;
            Request.Headers.TryGetValue("Authorization", out var value);
            var user = await _authService.GetCurrentUserAsync(value[0].Split(' ')[1]);
            var lesson = await _bookingService.AddLessonRequestAsync(model.LessonTypeId, model.SlotIds, user);
            return _mapper.Map<LessonModel>(lesson);
        }

    }
}
