using System;
using System.Collections.Generic;
using System.Linq;
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
    [Route("api")]
    [ApiController]
    public class SystemController : ControllerBase
    {

        [HttpGet("timezones")]
        public ICollection<TimeZoneModel> GetTimeZones()
        {
            return TimeZoneInfo.GetSystemTimeZones().Select(tz => new TimeZoneModel( tz.Id, tz.DisplayName)).ToList();
        }
    }
}
