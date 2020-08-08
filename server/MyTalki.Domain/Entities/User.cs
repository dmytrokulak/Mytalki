using System;
using System.Collections.Generic;
using MyTalki.Core.Domain.Entities;

namespace MyTalki.Domain.Entities
{
    public class User : EntityBase
    {
        public virtual string FirstName { get; set; }
        public virtual string LastName { get; set; }
        public virtual string Email { get; set; }
        public virtual string Password { get; set; }
        public virtual Uri Avatar { get; set; }
        public virtual bool IsAdmin { get; set; }
        public virtual DateTimeOffset RegisteredAt { get; set; }
        public virtual string TimeZone { get; set; }
        public virtual ICollection<Lesson> Lessons { get; set; }
    }
}
