using System.Threading.Tasks;

namespace Kulak.Kernel.Domain.Events
{
    /// <summary>
    /// Marker interface for a domain event handler.
    /// </summary>
    public interface IEventHandler
    {

    }

    public interface IEventHandler<T> : IEventHandler where T : IEvent
    {
        Task HandleAsync(T @event);
    }
}
