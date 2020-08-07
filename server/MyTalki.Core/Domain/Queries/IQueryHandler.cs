using System.Collections.Generic;
using System.Threading.Tasks;
using MyTalki.Core.Domain.Entities;

namespace MyTalki.Core.Domain.Queries
{
    /// <summary>
    /// Marker interface for a domain query handler.
    /// </summary>
    public interface IQueryHandler
    {

    }

    public interface IQueryHandler<TQuery, TEntity> : IQueryHandler where TQuery : IQuery where TEntity : IEntity
    {
        Task<IList<TEntity>> HandleAsync(TQuery query);
    }
}
