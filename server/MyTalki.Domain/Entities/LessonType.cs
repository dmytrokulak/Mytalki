using System;
using System.Collections.Generic;
using System.Text;

namespace MyTalki.Domain.Entities
{
    public class LessonType
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool Active { get; set; }
        public ICollection<Offer> Offers { get; set; }
    }
}
