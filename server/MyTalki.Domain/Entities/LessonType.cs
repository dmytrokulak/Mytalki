using System.Collections.Generic;
using MyTalki.Core.Domain.Entities;

namespace MyTalki.Domain.Entities
{
    public class LessonType : EntityBase
    {
        public virtual string Title { get; set; }
        public virtual string Description { get; set; }
        public virtual bool Active { get; set; }
        public virtual ICollection<Offer> Offers { get; set; }
    }
}
