using System;
using System.Collections.Generic;
using System.Linq;
using MyTalki.Core.Domain.Entities;

namespace MyTalki.Domain.Entities
{
    public class Lesson : EntityBase
    {
        public virtual LessonType LessonType { get; set; }
        public virtual Offer Offer { get; set; }
        public virtual LessonStatus Status { get; set; }
        public virtual ICollection<CalendarSlot> Slots { get; set; }
        public virtual DateTimeOffset StartAt => Slots.Select(s => s.StartAt).Min();
        public virtual User User { get; set; }
    }


    public enum LessonStatus
    {
        Undefined = 0,
        Requested = 10,
        Upcoming = 20,
        Ongoing = 30,
        Passed = 40,
        Completed = 50,
        Canceled = 60
    }
}