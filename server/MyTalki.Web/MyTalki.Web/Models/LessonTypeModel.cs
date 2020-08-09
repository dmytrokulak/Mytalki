using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MyTalki.Web.Models
{
    public class LessonTypeModel
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }
        public bool OnSale { get; set; }
        [Required]
        public ICollection<OfferModel> Offers { get; set; }
 }
}
