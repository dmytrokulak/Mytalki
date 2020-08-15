using System;

namespace MyTalki.Web.Models
{
    public class ScheduleCreateModel
    {
        public string Title { get; set; }
        public DateTimeOffset StartDate { get; set; }
    }
}
