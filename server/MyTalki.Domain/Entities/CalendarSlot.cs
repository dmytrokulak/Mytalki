using System;
using System.Collections.Generic;
using System.Text;

namespace MyTalki.Domain.Entities
{
    public class CalendarSlot
    {
        public int Id { get; set; }
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
