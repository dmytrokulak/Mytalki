using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyTalki.Domain.Entities;

namespace MyTalki.Persistence.Configurations 
{
    public class MessengerConfiguration : IEntityTypeConfiguration<Messenger>
    {
        public void Configure(EntityTypeBuilder<Messenger> builder)
        {
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Tool).HasMaxLength(50).IsRequired();
            builder.Property(e => e.Address).HasMaxLength(50).IsRequired();
        }
    }
}
