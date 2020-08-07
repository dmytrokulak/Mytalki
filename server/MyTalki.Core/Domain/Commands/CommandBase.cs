using System;

namespace MyTalki.Core.Domain.Commands
{
    /// <summary>
    /// Base class containing properties
    /// common for all commands.
    /// </summary>
    public abstract class CommandBase : ICommand
    {
        /// <summary>
        /// User who submits the command.
        /// </summary>
        public int InitiatorId { get; set; }
    }
}
