using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyTalki.Domain.Entities;

namespace MyTalki.Persistence.Configurations 
{
    public class ScheduleConfiguration : IEntityTypeConfiguration<Schedule>
    {
        public void Configure(EntityTypeBuilder<Schedule> builder)
        {
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Title).HasMaxLength(50).IsRequired();
            builder.HasMany(e => e.Days).WithOne(e => e.Schedule).OnDelete(DeleteBehavior.Cascade);

        }
    }
}
