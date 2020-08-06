using System;

namespace Kulak.Kernel.Persistence
{
    /// <summary>
    /// Produces a scope for commands
    /// to be performed as a single transaction.
    /// </summary>
    public interface ITransaction : IDisposable
    {
    }
}
