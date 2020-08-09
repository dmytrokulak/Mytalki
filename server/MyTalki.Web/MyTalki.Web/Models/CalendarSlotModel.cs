using System;
using System.Linq;
using MyTalki.Domain.Entities;

namespace MyTalki.Web.Models
{
    public class CalendarSlotModel
    {
        public virtual int Id { get; set; }
        public virtual DateTimeOffset StartAt { get; set; }
        public virtual string Status { get; set; }
    }
}
