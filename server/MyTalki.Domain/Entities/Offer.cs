﻿using MyTalki.Core.Domain.Entities;

namespace MyTalki.Domain.Entities
{
    public class Offer : EntityBase
    {
        public int Minutes { get; set; }
        public decimal Price { get; set; }
        public string Currency { get; set; }
    }
}
