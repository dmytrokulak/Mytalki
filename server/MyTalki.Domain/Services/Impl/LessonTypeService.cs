using System;
using System.Collections.Generic;
using System.Linq;
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
        private ITransactionFactory<ITransaction> _transactionFactory;

        public LessonTypeService(IEntityRepository repository, ITransactionFactory<ITransaction> transactionFactory)
        {
            _repository = repository;
            _transactionFactory = transactionFactory;
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

        public async Task<LessonType> CreateLessonTypeAsync(LessonType entity)
        {
            using (var transaction = _transactionFactory.Execute())
            {
                await _repository.AddAsync(entity);
                transaction.Save();
            }
            return entity;
        }

        public async Task ModifyLessonTypeAsync(int id, LessonType entity)
        {
            using (var transaction = _transactionFactory.Execute())
            {
                var tracked = await _repository.LoadAsync<LessonType>(id);
                
                tracked.Title = entity.Title;
                tracked.Description = entity.Description;
                tracked.Active = entity.Active;
                
                var offersToRemove = new List<Offer>();
                foreach (var trackedOffer in tracked.Offers)
                {
                    var offer = entity.Offers.SingleOrDefault(o => o.Id == trackedOffer.Id);
                    if (offer != null)
                    {
                        trackedOffer.Minutes = offer.Minutes;
                        trackedOffer.Currency = offer.Currency;
                        trackedOffer.Price = offer.Price;
                    }
                    else
                    {
                        offersToRemove.Add(trackedOffer);
                    }
                }
                foreach (var offer in offersToRemove) 
                    tracked.Offers.Remove(offer);
                foreach (var offer in entity.Offers.Where(o => o.Id == default)) 
                    tracked.Offers.Add(offer);

                transaction.Save();
            }
        }


        public async Task SuspendLessonTypeAsync(int id)
        {
            using (var transaction = _transactionFactory.Execute())
            {
                var entity = await _repository.LoadAsync<LessonType>(id);
                entity.Active = false;
                transaction.Save();
            }
        }

        public async Task RestoreLessonTypeAsync(int id)
        {
            using (var transaction = _transactionFactory.Execute())
            {
                var entity = await _repository.LoadAsync<LessonType>(id);
                entity.Active = false;
                transaction.Save();
            }
        }

        public async Task DeleteLessonTypeAsync(int id)
        {
            using (var transaction = _transactionFactory.Execute())
            {
                var entity = await _repository.LoadAsync<LessonType>(id);
                await _repository.RemoveAsync(entity);
                transaction.Save();
            }
        }
    }
}