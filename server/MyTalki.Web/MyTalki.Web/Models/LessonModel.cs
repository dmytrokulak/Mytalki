using System;
using System.Collections.Generic;
using MyTalki.Domain.Entities;

namespace MyTalki.Web.Models
{
    public class LessonModel
    {
        public int Id { get; set; }
        public virtual OfferModel Offer { get; set; }
        public virtual string Status { get; set; }
        public virtual ICollection<CalendarSlotModel> Slots { get; set; }
        public virtual DateTimeOffset StartAt { get; set; }
        public virtual UserModel User { get; set; }
    }
}
