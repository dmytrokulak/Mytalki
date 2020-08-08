using System;
using MyTalki.Core.Domain.Entities;

namespace MyTalki.Domain.Entities
{
    public class CalendarSlot : EntityBase
    {
        public DateTimeOffset StartAt { get; set; }
        public SlotStatus Status { get; set; }
    }

    public enum SlotStatus
    {
        NotAvailable = 0,
        Vacant = 10,
        Booked = 20,
        BookRequest = 30,
        CancelRequest = 40,
        RescheduleRequest = 50
    }
}
