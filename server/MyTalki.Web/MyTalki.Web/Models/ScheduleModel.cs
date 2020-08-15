using System;
using System.Collections.Generic;

namespace MyTalki.Web.Models
{
    public class ScheduleModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public IEnumerable<ScheduleDayModel> Days { get; set; }
    }


    public class ScheduleDayModel
    {
        public DayOfWeek DayOfWeek { get; set; }
        public IEnumerable<ScheduleSlotModel> Slots { get; set; }
    }

    public class ScheduleSlotModel
    {
        public TimeSpan StartTime { get; set; }
    }
}
