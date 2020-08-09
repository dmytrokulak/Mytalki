using System.Collections.Generic;

namespace MyTalki.Web.Models
{
    public class LessonTypeModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool OnSale { get; set; }
        public ICollection<OfferModel> Offers { get; set; }
 }
}
