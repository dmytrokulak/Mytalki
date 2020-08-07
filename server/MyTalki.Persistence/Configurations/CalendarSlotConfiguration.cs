using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyTalki.Domain.Entities;

namespace MyTalki.Persistence.Configurations 
{
    public class CalendarSlotConfiguration : IEntityTypeConfiguration<CalendarSlot>
    {
        public void Configure(EntityTypeBuilder<CalendarSlot> builder)
        {
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Status).IsRequired();
            builder.Property(e => e.StartAt).IsRequired();
        }
    }
}
