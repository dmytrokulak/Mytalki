﻿using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Kulak.Kernel.Domain.Entities;

namespace Kulak.Kernel.Persistence
{ 
    /// <summary>
    /// Generic repository which resolves
    /// entity type on per query basis.
    /// </summary>
    public interface IEntityRepository : IRepository
    {
        Task<T> GetAsync<T>(Guid id) where T : IEntity;
        Task<IList<T>> GetSomeAsync<T>(IEnumerable<Guid> ids = null, Expression<Func<T, bool>> predicate = null,
            int? skip = null, int? take = null, string orderBy = null, string orderMode = null) where T : IEntity;
        Task<IList<T>> GetAllAsync<T>() where T : IEntity;
     
        Task<T> LoadAsync<T>(Guid id) where T : IEntity;
        Task<IList<T>> LoadSomeAsync<T>(IEnumerable<Guid> ids = null, Expression<Func<T, bool>> predicate = null,
            int? skip = null, int? take = null, string orderBy = null, string orderMode = null) where T : IEntity;
        Task<IList<T>> LoadAllAsync<T>() where T : IEntity;

        Task AddAsync<T>(T entity) where T : IEntity;

        Task AddSomeAsync<T>(T entities) where T : IEntity;

        Task RemoveAsync<T>(T entity) where T : IEntity;
        Task RemoveSomeAsync<T>(IEnumerable<T> entities) where T : IEntity;
    }
}
