using System.Collections.Generic;
using System.Threading.Tasks;
using MyTalki.Core.Persistence;
using MyTalki.Domain.Entities;
using MyTalki.Domain.Queries;

namespace MyTalki.Domain.Services.Impl
{
    public class CalendarService : ICalendarService
    {
        private IEntityRepository _repository;
        private ITransactionFactory<ITransaction> _transactionFactory;

        public CalendarService(IEntityRepository repository, ITransactionFactory<ITransaction> transactionFactory)
        {
            _repository = repository;
            _transactionFactory = transactionFactory;
        }
        public async Task<ICollection<CalendarSlot>> GetCalendarSlotsAsync()
        {
            return await _repository.GetSomeAsync<CalendarSlot>();
        }

        public async Task<ICollection<CalendarSlot>> GetCalendarSlotsAsync(CalendarSlotQuery query)
        {
            return await _repository.GetSomeAsync<CalendarSlot>();
        }

        public async Task<IEnumerable<CalendarSlot>> CreateVacantSlotsAsync(IEnumerable<CalendarSlot> entities)
        {
            using (var transaction = _transactionFactory.Begin())
            {
                foreach (var entity in entities)
                    await _repository.AddAsync(entity);
                transaction.Save();
            }

            return entities;
        }

        public async Task RemoveVacantSlotAsync(IEnumerable<int> ids)
        {
            using (var transaction = _transactionFactory.Begin())
            {
                foreach (var id in ids)
                {
                    var entity = await _repository.GetAsync<CalendarSlot>(id);
                    await _repository.RemoveAsync(entity);
                }
                transaction.Save();
            }
        }
    }
}