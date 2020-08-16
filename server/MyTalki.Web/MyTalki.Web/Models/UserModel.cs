namespace MyTalki.Web.Models
{
    public class UserModel
    {
        public  int Id { get; set; }
        public  string FirstName { get; set; }
        public  string LastName { get; set; }
        public  string Email { get; set; }
        public  bool IsAdmin { get; set; }
        public  string TimeZone { get; set; }
        public  string Avatar { get; set; }
    }
}
