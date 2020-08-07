﻿using System;
using MyTalki.Core.Utilities;

namespace MyTalki.Core.Domain.Entities
{
    /// <summary>
    /// Base class containing properties
    /// common for all entities.
    /// </summary>
    public class EntityBase : IEntity
    {
        //default ctor for ORMs
        public EntityBase()
        {
        }

        protected EntityBase(int id, string name)
        {
            Id = id;
            Name = name;
        }

        private int _id;

        public int Id
        {
            get => _id;
            set
            {
                Guard.Against.Zero(value, "id");
                _id = value;
            }
        }

        private string _name;

        public string Name
        {
            get => _name;
            set
            {
                Guard.Against.NullOrWhitespace(value, "name");
                _name = value;
            }
        }

        public override bool Equals(object obj)
            => Id == ((EntityBase) obj)?.Id;

        public override int GetHashCode()
            => Id.GetHashCode();

        public override string ToString()
            => $"{GetType().Name} {Id} '{Name}'";

        public static bool operator ==(EntityBase a, EntityBase b)
        {
            if (a is null && b is object)
                return false;
            if (a is object && b is null)
                return false;
            if (a is null)
                return true;
            return a.Equals(b);
        }

        public static bool operator !=(EntityBase a, EntityBase b)
        {
            if (a is null && b is object)
                return true;
            if (a is object && b is null)
                return true;
            if (a is null)
                return false;
            return !a.Equals(b);
        }
    }
}