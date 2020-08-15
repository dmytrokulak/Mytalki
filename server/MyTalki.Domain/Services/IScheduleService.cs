using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MyTalki.Domain.Entities;

namespace MyTalki.Domain.Services
{
    public interface IScheduleService
    {
        Task<IEnumerable<Schedule>> GetAsync();
        Task<Schedule> CreateScheduleAsync(string title, DateTimeOffset startDate);
        Task<IEnumerable<CalendarSlot>> ApplyScheduleAsync(int id, DateTimeOffset startDate);
    }
}
