namespace MyTalki.Web.Models
{
    public class OfferModel
    {
        public int Id { get; set; }
        public int Minutes { get; set; }
        public decimal Price { get; set; }
        public string Currency { get; set; }
        public bool OnSale { get; set; }
        public int Active { get; set; } 
        public int Done { get; set; } 

    }
}
