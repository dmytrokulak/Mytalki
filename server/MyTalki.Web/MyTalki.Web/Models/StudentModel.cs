using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyTalki.Web.Models
{
    public class StudentModel
    {
        public  int Id { get; set; }
        public  string FirstName { get; set; }
        public  string LastName { get; set; }
        public  string Email { get; set; }
        public  string TimeZone { get; set; }
        public  string Avatar { get; set; }
        public IEnumerable<LessonModel> Lessons { get; set; }
    }
}
