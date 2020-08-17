using System;
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

            builder.HasIndex(e => e.Email).IsUnique();

            //ToDo:: remove seed data
            builder.HasData(new User
            {
                Id = 1,
                FirstName = "Super",
                LastName = "Teacher",
                Email = "mail@bogus.nouse",
                Password = "91fe2c86987e41bd3b2acf74a8f1eb438cfa284aa90814e83e38963e22425dbe",
                IsAdmin = true,
                RegisteredAt = DateTimeOffset.Now,
                TimeZone = "GMT"
            });
        }
    }
}
