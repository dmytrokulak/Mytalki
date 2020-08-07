using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Linq.Expressions;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MyTalki.Core.Domain.Entities;
using MyTalki.Core.Persistence;

namespace MyTalki.Persistence.Repositories
{
    public class EntityRepository : IEntityRepository
    {
        private readonly DomainContext _dbContext;
        private static Dictionary<Type, List<string>> _includes;

        public EntityRepository(DomainContext dbContext)
        {
            _dbContext = dbContext;
            PopulateIncludes();
        }

        private static void PopulateIncludes()
        {
            _includes ??= Assembly.Load("Epok.Domain").GetTypes().Where(IsEntity)
                .ToDictionary(t => t, t => t.GetProperties()
                    .Where(p => p.CanWrite && (IsEntity(p.PropertyType) || IsEntities(p.PropertyType)))
                    .Select(p => p.Name).ToList());

            bool IsEntity(Type t) => typeof(IEntity).IsAssignableFrom(t);

            bool IsEntities(Type t) => typeof(IEnumerable).IsAssignableFrom(t)
                                       && t.IsGenericType && t.GenericTypeArguments.Length == 1
                                       && IsEntity(t.GenericTypeArguments[0]);
        }


        public async Task<T> LoadAsync<T>(int id) where T : EntityBase
            => await _dbContext.Set<T>().FindAsync(id);

        public async Task<IList<T>> LoadSomeAsync<T>(IEnumerable<int> ids = null, 
            Expression<Func<T, bool>> predicate = null, int? skip = null, int? take = null, string orderBy = null, string orderMode = null) where T : EntityBase
        {
            throw new NotImplementedException();
        }

        public async Task<IList<T>> LoadAllAsync<T>() where T : EntityBase
        {
            throw new NotImplementedException();
        }

        public async Task<T> GetAsync<T>(int id) where T : EntityBase
        {
            var set = _dbContext.Set<T>().AsQueryable();

            foreach (var propName in _includes[typeof(T)])
                set = set.Include(propName);

            return await set.SingleOrDefaultAsync(e => e.Id == id);
        }

        public async Task<IList<T>> GetSomeAsync<T>(IEnumerable<int> ids = null, 
            Expression<Func<T, bool>> predicate = null, int? skip = null, int? take = null,
            string orderBy = null, string orderMode = null) where T : EntityBase
        {
            var set = _dbContext.Set<T>().AsQueryable();

            foreach (var propName in _includes[typeof(T)])
                set = set.Include(propName);

            if (ids != null)
                set = set.Where(e => ids.Contains(e.Id));
            if(predicate != null)
                set = set.Where(predicate);
          
            if(orderBy != null)
                set = set.OrderBy($"{orderBy} {NormalizeOrderMode(orderMode)}");
            else
                set = set.OrderBy(s => s.Id);

            if (skip != null)
                set = set.Skip(skip.Value);
            if (take != null)
                set = set.Take(take.Value);

            return await set.ToListAsync();
        }

        private string NormalizeOrderMode(string mode) => mode != "asc" && mode != "desc" ? "asc" : mode;

        public async Task<IList<T>> GetAllAsync<T>() where T : EntityBase
        {
            var set = _dbContext.Set<T>().AsQueryable();

            foreach (var propName in _includes[typeof(T)])
                set = set.Include(propName);

            return await set.ToListAsync();
        }

        public async Task AddAsync<T>(T entity) where T : EntityBase
            => await _dbContext.AddAsync(entity);

        public async Task AddSomeAsync<T>(T entities) where T : EntityBase
            => await _dbContext.AddRangeAsync(entities);

        public async Task RemoveAsync<T>(T entity) where T : EntityBase
            => await Task.Run(() => _dbContext.Remove(entity));

        public async Task RemoveSomeAsync<T>(IEnumerable<T> entities) where T : EntityBase
            => await Task.Run(() => _dbContext.RemoveRange(entities));
    }
}
