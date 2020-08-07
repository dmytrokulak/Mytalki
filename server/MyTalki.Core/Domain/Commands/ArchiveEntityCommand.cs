using System;

namespace MyTalki.Core.Domain.Commands
{
    /// <summary>
    /// Base command for an entity archiving.
    /// </summary>
    public abstract class ArchiveEntityCommand : CommandBase
    {
        /// <summary>
        /// Entity identifier.
        /// </summary>
        public int Id { get; set; }
    }
}
