using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyTalki.Domain.Entities;

namespace MyTalki.Persistence.Configurations 
{
    public class ScheduleDayConfiguration : IEntityTypeConfiguration<ScheduleDay>
    {
        public void Configure(EntityTypeBuilder<ScheduleDay> builder)
        {
            builder.HasKey(e => e.Id);
            builder.Property(e => e.DayOfWeek).IsRequired();
            builder.HasMany(e => e.Slots).WithOne(e => e.ScheduleDay).OnDelete(DeleteBehavior.Cascade);
        }
    }
}
