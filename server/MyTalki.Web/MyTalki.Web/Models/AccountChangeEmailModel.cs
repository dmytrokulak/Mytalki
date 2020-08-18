using System.ComponentModel.DataAnnotations;

namespace MyTalki.Web.Models
{
    public class AccountChangeEmailModel
    {
        [EmailAddress]
        public string Email { get; set; }
    }
}
