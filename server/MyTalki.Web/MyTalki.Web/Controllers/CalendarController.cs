using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
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
    [Route("api/calendar-slots")]
    [ApiController]
    public class CalendarController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ICalendarService _service;

        /// <summary>
        /// Controller to manage lesson type entities.
        /// </summary>
        /// <param name="mapper"></param>
        public CalendarController(IMapper mapper, ICalendarService service)
        {
            _mapper = mapper;
            _service = service;
        }


        /// <summary>
        /// Returns a collection of lessons: all or filtered with the parameters in query string. 
        /// </summary>
        /// <param name="titleLike">Filter by partial equality.</param>
        /// <param name="active">Filter by strict equality.</param>
        /// <param name="take">Number of entities to return in response.</param>
        /// <param name="skip">Number of entities to skip when returning in response.</param>
        /// <param name="orderBy">Property name. Sorted by "name" by default</param>
        /// <param name="orderMode">Either "asc" or "desc", "asc" by default.</param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IEnumerable<CalendarSlotModel>> GetAsync([FromQuery] string titleLike,
                       [FromQuery] bool? active, int? take, int? skip, string orderBy, string orderMode)
        {
            var entities = await _service.GetCalendarSlotsAsync();
            var calendarSlotModels = _mapper.Map<IEnumerable<CalendarSlotModel>>(entities);
            return calendarSlotModels;
        }



        /// <summary>
        /// Creates new vacant calendar slots.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [Authorize("Admin")]
        [HttpPost]
        public async Task<IEnumerable<CalendarSlotModel>> PostAsync([FromBody] IEnumerable<CalendarSlotModel> model)
        {
            var entities = _mapper.Map<IEnumerable<CalendarSlot>>(model);
            await _service.CreateVacantSlotsAsync(entities);
            return _mapper.Map<IEnumerable<CalendarSlotModel>>(entities);
        }


        /// <summary>
        /// Removes calendar slots from vacant.
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        [Authorize("Admin")]
        [HttpDelete]
        public async Task DeleteAsync([FromBody] IEnumerable<int> ids)
        {
            await _service.RemoveVacantSlotAsync(ids);
        }



    }
}
