using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MyTalki.Web.Models
{
    public class BookRequestModel
    {
        [Range(1, int.MaxValue)]
        public int LessonTypeId { get; set; }
        [Required]
        public IEnumerable<int> SlotIds { get; set; }
    }
}
