using System;
using System.Collections.Generic;
using MyTalki.Core.Domain.Entities;

namespace MyTalki.Domain.Entities
{
    public class Schedule : EntityBase
    {
        public string Title { get; set; }
        public ICollection<ScheduleDay> Days { get; set; }
    }

    public class ScheduleDay : EntityBase
    {
        public DayOfWeek DayOfWeek { get; set; }
        public ICollection<DateTime> Slots { get; set; }
    }
}
