using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IBookingService _bookingService;

        /// <summary>
        /// Controller to manage lesson type entities.
        /// </summary>
        /// <param name="mapper"></param>
        public BookingController(IMapper mapper, IBookingService service)
        {
            _mapper = mapper;
            _bookingService = service;
        }


        /// <summary>
        /// Creates a new lesson type in the system.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        public async Task<LessonModel> PostAsync([FromBody] BookRequestModel model)
        {
            var userId = int.Parse(HttpContext.User.FindFirst(c => c.Type == ClaimTypes.Sid).Value);
            var lesson = await _bookingService.AddLessonRequestAsync(model.LessonTypeId, model.OfferId, model.SlotIds, userId);
            return _mapper.Map<LessonModel>(lesson);
        }

        [Authorize("Admin")]
        [HttpPatch("accept/{lessonId}")]
        public async Task PatchcAcceptBookRequestAsync(int lessonId)
        {
            await _bookingService.AcceptLessonRequestAsync(lessonId);
        }
    }
}
