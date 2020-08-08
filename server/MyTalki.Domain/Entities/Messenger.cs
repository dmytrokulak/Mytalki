using MyTalki.Core.Domain.Entities;

namespace MyTalki.Domain.Entities
{
    //aka communication
    public class Messenger : EntityBase
    {
        public virtual string Tool { get; set; }
        //aka number   
        public virtual string Address { get; set; }
    }
}