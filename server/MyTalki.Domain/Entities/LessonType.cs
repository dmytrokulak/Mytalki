﻿using System.Collections.Generic;
using MyTalki.Core.Domain.Entities;

namespace MyTalki.Domain.Entities
{
    public class LessonType : EntityBase
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public bool Active { get; set; }
        public ICollection<Offer> Offers { get; set; }
    }
}
