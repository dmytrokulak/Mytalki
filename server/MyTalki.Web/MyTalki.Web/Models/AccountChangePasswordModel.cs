using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyTalki.Web.Models
{
    public class AccountChangePasswordModel
    {
        public string PasswordOld { get; set; }
        public string PasswordNew { get; set; }
    }
}
