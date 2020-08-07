using MyTalki.Core.Domain.Entities;

namespace MyTalki.Domain.Entities
{
    //aka communication
    public class Messenger : EntityBase
    {
        public string Tool { get; set; }
        //aka number
        public string Address { get; set; }
    }
}