using System;
using System.Collections.Generic;
using MyTalki.Core.Domain.Entities;

namespace MyTalki.Domain.Entities
{
    public class User : EntityBase
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public Uri Avatar { get; set; }
        public DateTimeOffset RegisteredAt { get; set; }
        public string TimeZone { get; set; }

        public ICollection<Lesson> Lessons { get; set; }
    }
}
