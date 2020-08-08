using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MyTalki.Domain.Entities;
using MyTalki.Domain.Queries;
using MyTalki.Domain.Services;
using MyTalki.Web.Models;

namespace MyTalki.Web.Controllers
{
    /// <summary>
    /// Controller to manage customer entities.
    /// </summary>
    [Route("api/lesson-types")]
    [ApiController]
    public class LessonTypesController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ILessonTypeService _service;

        /// <summary>
        /// Controller to manage customer entities.
        /// </summary>
        /// <param name="mapper"></param>
        public LessonTypesController(IMapper mapper, ILessonTypeService service)
        {
            _mapper = mapper;
            _service = service;
        }

        /// <summary>
        /// Returns a collection of customers: all or filtered with the parameters in query string. 
        /// </summary>
        /// <param name="titleLike">Filter by partial equality.</param>
        /// <param name="active">Filter by strict equality.</param>
        /// <param name="take">Number of entities to return in response.</param>
        /// <param name="skip">Number of entities to skip when returning in response.</param>
        /// <param name="orderBy">Property name. Sorted by "name" by default</param>
        /// <param name="orderMode">Either "asc" or "desc", "asc" by default.</param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IEnumerable<LessonTypeModel>> GetAsync([FromQuery] string titleLike,
               [FromQuery] bool? active, int? take, int? skip, string orderBy, string orderMode) 
        {
            var query = new LessonTypeQuery
            {
                Take = take,
                Skip = skip,
                OrderBy = orderBy,
                OrderMode = orderMode,
                FilterTitleLike = titleLike,
                FilterActive = active,
            };
            var entities = await _service.GetLessonTypesAsync(query);
            return _mapper.Map<IEnumerable<LessonTypeModel>>(entities);
        }

        /// <summary>
        /// Returns a single customer by id.
        /// </summary>
        /// <param name="id">Customer id.</param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<LessonTypeModel> GetAsync(int id)
        {
            var entity = await _service.GetLessonTypeAsync(id);
            return _mapper.Map<LessonTypeModel>(entity);
        }


        /// <summary>
        /// Creates a new customer in the system.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<int> PostAsync([FromBody] LessonTypeModel model)
        {
            var entity = _mapper.Map<LessonType>(model);
            await _service.CreateLessonTypeAsync(entity);
            return entity.Id;
        }

        ///// <summary>
        ///// Modifies customer by customer id.
        ///// </summary>
        ///// <param name="id">Customer id.</param>
        ///// <param name="model"></param>
        ///// <returns></returns>
        //[HttpPut("{id}/type")]
        //public async Task PutCustomerTypeAsync(Guid id, [FromBody] ChangeCustomerTypeModel model)
        //{
        //    var command = _mapper.Map<ChangeCustomerType>(model);
        //    command.Id = id;
        //    //ToDo:3  command.InitiatorId = User.Identity.Id;
        //    command.InitiatorId = Guid.NewGuid();
        //    await _commandInvoker.Execute(command);
        //}

        //[HttpPut("{id}/contact/{subId}/primary")]
        //public async Task PutCustomerContactAsPrimaryAsync(Guid id, Guid subId)
        //{
        //    var command = new SetCustomerPrimaryContact
        //    {
        //        NewPrimaryContactId = subId, CustomerId = id, InitiatorId = Guid.NewGuid()
        //    };
        //    //ToDo:3  command.InitiatorId = User.Identity.Id;
        //    await _commandInvoker.Execute(command);
        //}

        ///// <summary>
        ///// Removes customer from the system.
        ///// </summary>
        ///// <param name="id">Customer id.</param>
        ///// <returns></returns>
        //[HttpDelete("{id}")]
        //public async Task DeleteAsync(Guid id)
        //{
        //    await _commandInvoker.Execute(new ArchiveCustomer {Id = id, InitiatorId = Guid.NewGuid()});
        //}
    }
}
