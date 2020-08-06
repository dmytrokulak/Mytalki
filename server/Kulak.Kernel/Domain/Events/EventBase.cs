﻿using System;
using Kulak.Kernel.Utilities;

namespace Kulak.Kernel.Domain.Events
{
    /// <summary>
    /// Base to implement audit properties.
    /// </summary>
    [Serializable]
    public abstract class EventBase : IEvent
    {
        private Guid _raisedBy;

        public DateTimeOffset RaisedAt { get; } = DateTimeOffset.Now;

        public Guid RaisedBy
        {
            get => _raisedBy;
            protected set
            {
                Guard.Against.Empty(value, nameof(RaisedBy));
                _raisedBy = value;
            }
        }
    }
}
