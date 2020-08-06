using System;
using System.Collections.Generic;
using System.Linq;

namespace MyTalki.Domain.Entities
{
    public class Lesson
    {
        public int Id { get; set; }
        public LessonType LessonType { get; set; }
        public LessonStatus Status { get; set; }
        public ICollection<CalendarSlot> Slots { get; set; }
        public DateTimeOffset StartAt => Slots.Select(s => s.StartAt).Min();
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