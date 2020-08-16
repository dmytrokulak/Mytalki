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
    [Route("api/students")]
    //[Authorize("Admin")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IStudentService _service;

        /// <summary>
        /// Controller to manage lesson type entities.
        /// </summary>
        /// <param name="mapper"></param>
        public StudentController(IMapper mapper, IStudentService service)
        {
            _mapper = mapper;
            _service = service;
        }


        [HttpGet]
        public async Task<IEnumerable<StudentModel>> GetAsync([FromQuery] string titleLike,
            [FromQuery] bool? active, int? take, int? skip, string orderBy, string orderMode)
        {
            var entities = await _service.GetStudentsAsync();
            return _mapper.Map<IEnumerable<StudentModel>>(entities);
        }

    }
}
