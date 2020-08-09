using System.Collections.Generic;
using System.Threading.Tasks;
using MyTalki.Domain.Entities;
using MyTalki.Domain.Queries;

namespace MyTalki.Domain.Services
{
    public interface ICalendarService
    {
        Task<ICollection<CalendarSlot>> GetCalendarSlotsAsync();
        Task<ICollection<CalendarSlot>> GetCalendarSlotsAsync(CalendarSlotQuery query);
        Task<IEnumerable<CalendarSlot>> CreateVacantSlotsAsync(IEnumerable<CalendarSlot> entities);
    }
}
