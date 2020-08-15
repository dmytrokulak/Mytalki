using System;
using System.Collections.Generic;
using MyTalki.Core.Domain.Entities;

namespace MyTalki.Domain.Entities
{
    public class Schedule : EntityBase
    {
        public virtual string Title { get; set; }
        public virtual ICollection<ScheduleDay> Days { get; set; }
    }

    public class ScheduleDay : EntityBase
    {
        public virtual DayOfWeek DayOfWeek { get; set; }
        public virtual ICollection<ScheduleSlot> Slots { get; set; }
        public virtual Schedule Schedule { get; set; }
    }

    public class ScheduleSlot : EntityBase
    {
        public virtual TimeSpan StartTime { get; set; }
        public virtual ScheduleDay ScheduleDay { get; set; }
    }
}
