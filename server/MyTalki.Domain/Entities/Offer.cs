using System;
using System.Collections.Generic;
using System.Text;

namespace MyTalki.Domain.Entities
{
    public class Offer
    {
        public int Id { get; set; }
        public int Minutes { get; set; }
        public decimal Price { get; set; }
        public string Currency { get; set; }
    }
}
