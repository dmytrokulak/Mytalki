﻿using MyTalki.Core.Domain.Entities;

namespace MyTalki.Domain.Entities
{
    public class Offer : EntityBase
    {
        public virtual int Minutes { get; set; }
        public virtual decimal Price { get; set; }
        public virtual string Currency { get; set; }
    }
}
