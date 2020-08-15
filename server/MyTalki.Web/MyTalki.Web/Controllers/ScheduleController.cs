using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyTalki.Domain.Services;
using MyTalki.Web.Models;

namespace MyTalki.Web.Controllers
{
    /// <summary>
    /// Controller to manage lesson type entities.
    /// </summary>
    [Route("api/schedules")]
    [Authorize("Admin")]
    [ApiController]
    public class ScheduleController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IScheduleService _service;

        /// <summary>
        /// Controller to manage lesson type entities.
        /// </summary>
        /// <param name="mapper"></param>
        public ScheduleController(IMapper mapper, IScheduleService service)
        {
            _mapper = mapper;
            _service = service;
        }


        [HttpGet]
        public async Task<IEnumerable<ScheduleModel>> GetAsync()
        {
            var entities = await _service.GetAsync();
            return _mapper.Map<IEnumerable<ScheduleModel>>(entities);
        }


        [HttpPost("save")]
        public async Task<ScheduleModel> SaveAsync([FromBody] ScheduleCreateModel model)
        {
            var entity = await _service.CreateScheduleAsync(model.Title, model.StartDate);
            return _mapper.Map<ScheduleModel>(entity);
        }


        [HttpPost("apply")]
        public async Task<IEnumerable<CalendarSlotModel>> ApplyAsync([FromBody] ScheduleApplyModel model)
        {
          var entities =  await _service.ApplyScheduleAsync(model.Id, model.StartDate);
          return _mapper.Map<IEnumerable<CalendarSlotModel>>(entities);
        }

        [HttpDelete("{id}")]
        public async Task DeleteAsync(int id)
        {
             await _service.DeleteAsync(id);
        }

    }
}
