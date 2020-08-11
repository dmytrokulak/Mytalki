using System.Collections.Generic;
using System.Threading.Tasks;
using MyTalki.Core.Persistence;
using MyTalki.Domain.Entities;

namespace MyTalki.Domain.Services.Impl
{
    public class BookingService : IBookingService
    {
        private readonly IEntityRepository _repository;
        private readonly ITransactionFactory<ITransaction> _transactionFactory;

        public BookingService(IEntityRepository repository, ITransactionFactory<ITransaction> transactionFactory)
        {
            _repository = repository;
            _transactionFactory = transactionFactory;
        }

        public async Task<Lesson> AddLessonRequestAsync(int lessonTypeId, IEnumerable<int> slotIds, User user)
        {
            using (var transaction = _transactionFactory.Begin())
            {
                var lessonType = await _repository.GetAsync<LessonType>(lessonTypeId);

                var slots = new List<CalendarSlot>();
                foreach (var id in slotIds)
                {
                    var entity = await _repository.GetAsync<CalendarSlot>(id);
                    entity.Status = SlotStatus.BookRequest;
                    slots.Add(entity);
                }

                var lesson = new Lesson
                {
                    LessonType = lessonType,
                    Status = LessonStatus.Requested,
                    Slots = slots,
                    User = user
                };
                await _repository.AddAsync(lesson);

                transaction.Save();
                return lesson;
            }
        }
    }
}