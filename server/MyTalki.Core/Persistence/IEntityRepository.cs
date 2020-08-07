using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using MyTalki.Core.Domain.Entities;

namespace MyTalki.Core.Persistence
{ 
    /// <summary>
    /// Generic repository which resolves
    /// entity type on per query basis.
    /// </summary>
    public interface IEntityRepository : IRepository
    {
        Task<T> GetAsync<T>(int id) where T : EntityBase;
        Task<IList<T>> GetSomeAsync<T>(IEnumerable<int> ids = null, Expression<Func<T, bool>> predicate = null,
            int? skip = null, int? take = null, string orderBy = null, string orderMode = null) where T : EntityBase;
        Task<IList<T>> GetAllAsync<T>() where T : EntityBase;
     
        Task<T> LoadAsync<T>(int id) where T : EntityBase;
        Task<IList<T>> LoadSomeAsync<T>(IEnumerable<int> ids = null, Expression<Func<T, bool>> predicate = null,
            int? skip = null, int? take = null, string orderBy = null, string orderMode = null) where T : EntityBase;
        Task<IList<T>> LoadAllAsync<T>() where T : EntityBase;

        Task AddAsync<T>(T entity) where T : EntityBase;

        Task AddSomeAsync<T>(T entities) where T : EntityBase;

        Task RemoveAsync<T>(T entity) where T : EntityBase;
        Task RemoveSomeAsync<T>(IEnumerable<T> entities) where T : EntityBase;
    }
}
