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
            builder.Property(e => e.StartAt).IsRequired();
            builder.HasOne(e => e.LessonType);
            builder.HasOne(e => e.Offer);
            builder.HasMany(e => e.Slots);
            builder.HasOne(e => e.User);
        }
    }
}
