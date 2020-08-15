using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyTalki.Core.Persistence;
using MyTalki.Domain.Entities;

namespace MyTalki.Domain.Services.Impl
{
    public class ScheduleService : IScheduleService
    {
        private IEntityRepository _repository;
        private ITransactionFactory<ITransaction> _transactionFactory;
        private const int DaysOnDisplay = 7;

        public ScheduleService(IEntityRepository repository, ITransactionFactory<ITransaction> transactionFactory)
        {
            _repository = repository;
            _transactionFactory = transactionFactory;
        }

        public async Task<IEnumerable<Schedule>> GetAsync()
        {
            return await _repository.GetAllAsync<Schedule>();
        }

        public async Task<Schedule> CreateScheduleAsync(string title, DateTimeOffset startDate)
        {
            var endDate = startDate.AddDays(DaysOnDisplay).AddMinutes(-1);
            var slots = (await _repository.GetAllAsync<CalendarSlot>())
                .Where(slot => slot.StartAt >= startDate && slot.StartAt < endDate).ToList();

            var schedule = new Schedule
            {
                Title = title,
                Days = slots.GroupBy(s => s.StartAt.DayOfWeek).Select(g => new ScheduleDay
                {
                    DayOfWeek = g.Key,
                    Slots = g.Select(s => new ScheduleSlot
                    {
                        StartTime = s.StartAt.TimeOfDay
                    }).ToList()
                }).ToList()
            };

            using (var transaction = _transactionFactory.Begin())
            {
                await _repository.AddAsync(schedule);
                transaction.Save();
            }
            return schedule;
        }

        public async Task<IEnumerable<CalendarSlot>> ApplyScheduleAsync(int id, DateTimeOffset startDate)
        {
            var endDate = startDate.AddDays(DaysOnDisplay).AddMinutes(-1);
            var slots = (await _repository.GetAllAsync<CalendarSlot>())
                .Where(slot => slot.StartAt >= startDate && slot.StartAt < endDate).ToList();
            var newSlots = new List<CalendarSlot>();

            var scheduledDays = (await _repository.GetAsync<Schedule>(id)).Days;
            for (var i = 0; i < DaysOnDisplay; i++)
            {
                var dt = startDate.AddDays(i);
                var scheduleDay = scheduledDays.SingleOrDefault(sd => sd.DayOfWeek == dt.DayOfWeek);
                if (scheduleDay == null)
                    continue;
                foreach (var scheduleSlot in scheduleDay.Slots)
                {
                    if (!slots.Any(s => s.StartAt.Date == dt.Date &&
                                        s.StartAt.TimeOfDay.Hours == scheduleSlot.StartTime.Hours &&
                                        s.StartAt.TimeOfDay.Minutes == scheduleSlot.StartTime.Minutes))
                    {
                        newSlots.Add(new CalendarSlot
                        {
                            StartAt = dt + scheduleSlot.StartTime,
                            Status = SlotStatus.Vacant
                        });
                    }
                }
            }
            using (var transaction = _transactionFactory.Begin())
            {
                await _repository.AddSomeAsync(newSlots);
                transaction.Save();
            }


            return newSlots;
        }
    }
}