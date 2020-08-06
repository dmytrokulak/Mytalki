using System.Collections.Generic;
using System.Threading.Tasks;
using Kulak.Kernel.Domain.Entities;

namespace Kulak.Kernel.Domain.Queries
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
