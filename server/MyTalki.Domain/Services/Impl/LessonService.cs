using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using MyTalki.Core.Persistence;
using MyTalki.Domain.Entities;

namespace MyTalki.Domain.Services.Impl
{
    public class LessonService : ILessonService
    {
        private IEntityRepository _repository;
        private ITransactionFactory<ITransaction> _transactionFactory;

        public LessonService(IEntityRepository repository, ITransactionFactory<ITransaction> transactionFactory)
        {
            _repository = repository;
            _transactionFactory = transactionFactory;
        }

        public async Task<ICollection<Lesson>> GetLessonsAsync()
        {
           return await _repository.GetAllAsync<Lesson>();
        }

        public async Task<ICollection<Lesson>> GetLessonsForUserAsync(int userId)
        {
            return await _repository.GetSomeAsync<Lesson>(predicate:lesson => lesson.User.Id == userId);
        }
    }
}