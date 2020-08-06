using System;
using System.Collections.Generic;

namespace MyTalki.Domain.Entities
{
    public class Schedule
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public ICollection<ScheduleDay> Days { get; set; }
    }

    public class ScheduleDay
    {
        public DayOfWeek DayOfWeek { get; set; }
        public ICollection<DateTime> Slots { get; set; }
    }
}
