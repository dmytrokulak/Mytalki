using System;
using MyTalki.Domain.Entities;

namespace MyTalki.Web.Models
{
    public class LessonModel
    {
     //   public virtual LessonTypeModel LessonType { get; set; }
        public virtual LessonStatus Status { get; set; }
    //    public virtual ICollection<CalendarSlotModel> Slots { get; set; }
        public virtual DateTimeOffset StartAt { get; set; }
    }
}
