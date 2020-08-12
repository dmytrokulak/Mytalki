using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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
    [ApiController]
    public class LessonController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ILessonService _service;

        /// <summary>
        /// Controller to manage lesson type entities.
        /// </summary>
        /// <param name="mapper"></param>
        public LessonController(IMapper mapper, ILessonService service)
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
        [Authorize("Admin")]
        [HttpGet("teacher")]
        public async Task<IEnumerable<LessonModel>> GetAsync([FromQuery] string titleLike,
                   [FromQuery] bool? active, int? take, int? skip, string orderBy, string orderMode)
        {
            var entities = await _service.GetLessonsAsync();
            return _mapper.Map<IEnumerable<LessonModel>>(entities);
        }


        [Authorize]
        [HttpGet("student")]
        public async Task<IEnumerable<LessonModel>> GetStudentLessonsAsync()
        {
            var id = int.Parse(HttpContext.User.FindFirst(c => c.Type == ClaimTypes.Sid).Value);
            var entities = await _service.GetLessonsForUserAsync(id);
            return _mapper.Map<IEnumerable<LessonModel>>(entities);
        }

    }
}
