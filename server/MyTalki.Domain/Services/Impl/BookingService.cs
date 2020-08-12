using System.Collections.Generic;
using System.Linq;
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

        public async Task<Lesson> AddLessonRequestAsync(int lessonTypeId, int offerId,
            IEnumerable<int> slotIds, int userId)
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

                var user = await _repository.GetAsync<User>(userId);

                var lesson = new Lesson
                {
                    LessonType = lessonType,
                    Offer = lessonType.Offers.Single(o => o.Id == offerId),
                    Status = LessonStatus.Requested,
                    Slots = slots,
                    User = user
                };
                await _repository.AddAsync(lesson);

                transaction.Save();
                return lesson;
            }
        }

        public async Task AcceptLessonRequestAsync(int lessonId)
        {
            using (var transaction = _transactionFactory.Begin())
            {
                var lesson = await _repository.GetAsync<Lesson>(lessonId);
                lesson.Status = LessonStatus.Upcoming;
                foreach (var slot in lesson.Slots) 
                    slot.Status = SlotStatus.Booked;

                transaction.Save();
            }
        }
    }
}