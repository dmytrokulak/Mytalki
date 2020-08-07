namespace MyTalki.Core.Domain.Queries
{
    /// <summary>
    /// Marker interface for a domain query.
    /// </summary>
    public interface IQuery
    {
        bool Lazy { get; }
    }
}
