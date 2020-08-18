using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyTalki.Web.Models
{
    public class TimeZoneModel
    {
        public TimeZoneModel(string id, string displayName)
        {
            Id = id;
            DisplayName = displayName;
        }
        public string Id { get;}
        public string DisplayName { get; }
    }
}
