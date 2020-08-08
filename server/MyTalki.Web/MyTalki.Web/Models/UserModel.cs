namespace MyTalki.Web.Models
{
    public class UserModel
    {
        public virtual int Id { get; set; }
        public virtual string FirstName { get; set; }
        public virtual string LastName { get; set; }
        public virtual string Email { get; set; }
        public virtual bool IsAdmin { get; set; }
        public virtual string TimeZone { get; set; }
    }
}
