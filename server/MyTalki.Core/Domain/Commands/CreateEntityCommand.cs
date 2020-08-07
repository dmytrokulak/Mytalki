using System;

namespace MyTalki.Core.Domain.Commands
{
    /// <summary>
    /// Base command for an entity creation.
    /// </summary>
    public abstract class CreateEntityCommand : CommandBase
    {
        /// <summary>
        /// Entity identifier.
        /// </summary>
        public int Id { get; set; } 
        /// <summary>
        /// Entity name.
        /// </summary>
        public string Name { get; set; }
    }
}
