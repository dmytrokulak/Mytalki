using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using MyTalki.Core.Persistence;
using MyTalki.Domain.Entities;
using MyTalki.Domain.Queries;

namespace MyTalki.Domain.Services.Impl
{
    public class LessonTypeService : ILessonTypeService
    {
        private IEntityRepository _repository;

        public LessonTypeService(IEntityRepository repository)
        {
            _repository = repository;
        }

        public async Task<ICollection<LessonType>> GetLessonTypesAsync()
        {
            return await _repository.GetAllAsync<LessonType>();
        }

        public async Task<LessonType> GetLessonTypeAsync(int id)
        {
            return await _repository.LoadAsync<LessonType>(id);
        }

        public async Task<ICollection<LessonType>> GetLessonTypesAsync(LessonTypeQuery query)
        {
            Expression<Func<LessonType, bool>> predicate = entity =>
                (query.FilterTitleLike == null || entity.Title.Contains(query.FilterTitleLike)) &&
                (query.FilterActive == null || entity.Active == query.FilterActive.Value);

            return await _repository.GetSomeAsync(query.FilterIds, predicate, query.Skip, query.Take,
                query.OrderBy, query.OrderMode);
        }

        public async Task<int> CreateLessonTypeAsync(LessonType entity)
        {
            await _repository.AddAsync(entity);
            return entity.Id;
        }

        public async Task ModifyLessonTypeAsync(LessonType entity)
        {
            var tracked = await _repository.LoadAsync<LessonType>(entity.Id);
            tracked.Title = entity.Title;
            tracked.Description = entity.Description;
            tracked.Offers = entity.Offers;
        }

        public async Task SuspendLessonTypeAsync(int id)
        {
            var entity = await _repository.LoadAsync<LessonType>(id);
            entity.Active = false;
        }

        public async Task RestoreLessonTypeAsync(int id)
        {
            var entity = await _repository.LoadAsync<LessonType>(id);
            entity.Active = false;
        }

        public async Task DeleteLessonTypeAsync(int id)
        {
            var entity = await _repository.LoadAsync<LessonType>(id);
            await _repository.RemoveAsync(entity);
        }
    }
}