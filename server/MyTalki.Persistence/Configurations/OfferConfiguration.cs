using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyTalki.Domain.Entities;

namespace MyTalki.Persistence.Configurations 
{
    public class OfferConfiguration : IEntityTypeConfiguration<Offer>
    {
        public void Configure(EntityTypeBuilder<Offer> builder)
        {
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Currency).HasMaxLength(5).IsRequired();
            builder.Property(e => e.Minutes).IsRequired();
            builder.Property(e => e.Price).IsRequired();
        }
    }
}
