using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyTalki.Domain.Entities;

namespace MyTalki.Persistence.Configurations 
{
    public class LessonConfiguration : IEntityTypeConfiguration<Lesson>
    {
        public void Configure(EntityTypeBuilder<Lesson> builder)
        {
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Status).IsRequired();
            builder.HasOne(e => e.LessonType);
            builder.HasMany(e => e.Slots);
        }
    }
}
