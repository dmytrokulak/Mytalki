using System.Collections.Generic;
using MyTalki.Core.Domain.Entities;

namespace MyTalki.Domain.Entities
{
    public class Offer : EntityBase
    {
        public virtual int Minutes { get; set; }
        public virtual decimal Price { get; set; }
        public virtual string Currency { get; set; }
        public virtual bool OnSale { get; set; }
        public virtual LessonType LessonType { get; set; }
        public virtual ICollection<Lesson> Lessons { get; set; }
    }
}
