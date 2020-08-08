using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyTalki.Domain.Entities;

namespace MyTalki.Persistence.Configurations 
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
           builder.HasKey(e => e.Id);
            builder.Property(e => e.FirstName).HasMaxLength(50).IsRequired();
            builder.Property(e => e.LastName).HasMaxLength(50).IsRequired();
            builder.Property(e => e.Password).HasMaxLength(500).IsRequired();
            builder.Property(e => e.Avatar).HasMaxLength(200);
            builder.Property(e => e.Email).HasMaxLength(50).IsRequired();
            builder.Property(e => e.IsAdmin).IsRequired();
            builder.Property(e => e.TimeZone).HasMaxLength(10).IsRequired();
            builder.Property(e => e.RegisteredAt).HasMaxLength(10).IsRequired();
            builder.HasMany(e => e.Lessons);
        }
    }
}
