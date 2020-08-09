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
    [Route("api/lessons")]
    [Authorize("Admin")]
    [ApiController]
    public class LessonController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ILessonTypeService _service;

        /// <summary>
        /// Controller to manage lesson type entities.
        /// </summary>
        /// <param name="mapper"></param>
        public LessonController(IMapper mapper, ILessonTypeService service)
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
        public async Task<IEnumerable<LessonModel>> GetAsync([FromQuery] string titleLike,
                   [FromQuery] bool? active, int? take, int? skip, string orderBy, string orderMode)
        {
            return Enumerable.Empty<LessonModel>();
        }


        ///// <summary>
        ///// Returns a single lesson type by id.
        ///// </summary>
        ///// <param name="id">Lesson type id.</param>
        ///// <returns></returns>
        //[HttpGet("{id}")]
        //public async Task<LessonTypeModel> GetAsync(int id)
        //{
        //    var entity = await _service.GetLessonTypeAsync(id);
        //    return _mapper.Map<LessonTypeModel>(entity);
        //}


        ///// <summary>
        ///// Creates a new lesson type in the system.
        ///// </summary>
        ///// <param name="model"></param>
        ///// <returns></returns>
        //[HttpPost]
        //public async Task<LessonTypeModel> PostAsync([FromBody] LessonTypeModel model)
        //{
        //    var entity = _mapper.Map<LessonType>(model);
        //    await _service.CreateLessonTypeAsync(entity);
        //    return _mapper.Map<LessonTypeModel>(entity);
        //}


        ///// <summary>
        ///// Modifies lesson type according to the model in the request.
        ///// </summary>
        ///// <param name="id"></param>
        ///// <param name="model"></param>
        ///// <returns></returns>
        //[HttpPut("{id}")]
        //public async Task PutAsync(int id, [FromBody] LessonType model)
        //{
        //    var entity = _mapper.Map<LessonType>(model);
        //    await _service.ModifyLessonTypeAsync(id, entity);
        //}


        ///// <summary>
        ///// Marks lesson type as not active (suspends it).
        ///// </summary>
        ///// <param name="id"></param>
        ///// <returns></returns>
        //[HttpPatch("{id}/suspend")]
        //public async Task PatchSuspendAsync(int id)
        //{
        //    await _service.SuspendLessonTypeAsync(id);
        //}


        ///// <summary>
        ///// Marks lesson type as active (restores it).
        ///// </summary>
        ///// <param name="id"></param>
        ///// <returns></returns>
        //[HttpPatch("{id}/restore")]
        //public async Task PatchRestoreAsync(int id)
        //{
        //    await _service.RestoreLessonTypeAsync(id);
        //}


        ///// <summary>
        ///// Removes lesson type from the system.
        ///// </summary>
        ///// <param name="id"></param>
        ///// <returns></returns>
        //[HttpDelete("{id}")]
        //public async Task DeleteAsync(int id)
        //{
        //    await _service.DeleteLessonTypeAsync(id);
        //}
    }
}
