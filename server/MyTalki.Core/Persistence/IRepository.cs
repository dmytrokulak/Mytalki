using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MyTalki.Core.Domain.Entities;

namespace MyTalki.Core.Persistence
{
    /// <summary>
    /// Marker interface for a repository.
    /// </summary>
    public interface IRepository
    {

    }

    public interface IRepository<T> : IRepository where T : IEntity
    {
        /// <summary>
        /// Lazy loading of a single entity.
        /// If lazy is not supported/implemented:
        /// lightweight loading without joins.
        /// </summary>
        Task<T> LoadAsync(int id);
        Task<IList<T>> LoadSomeAsync(IEnumerable<int> ids);
        Task<IList<T>> LoadAllAsync();
        /// <summary>
        ///  Eager loading of a single entity.
        /// </summary>
        Task<T> GetAsync(int id);
        Task<IList<T>> GetSomeAsync(IEnumerable<int> ids);
        Task<IList<T>> GetAllAsync();

        Task AddAsync(T entity);

        Task AddSomeAsync(T entities);

        Task RemoveAsync(T entity);
        Task RemoveSomeAsync(IEnumerable<T> entities);
    }
}
