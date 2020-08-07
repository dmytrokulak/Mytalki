using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyTalki.Domain.Entities;

namespace Epok.Persistence.EF.Configurations 
{
    public class UserConfiguration : IEntityTypeConfiguration<Schedule>
    {
        public void Configure(EntityTypeBuilder<Schedule> builder)
        {
         //   builder.HasKey(e => e.Id);
            //builder.Property(e => e.Name).HasMaxLength(200).IsRequired();
            //builder.Property(e => e.AddressLine1).HasMaxLength(100).IsRequired();
            //builder.Property(e => e.AddressLine2).HasMaxLength(100);
            //builder.Property(e => e.City).HasMaxLength(100).IsRequired();
            //builder.Property(e => e.Province).HasMaxLength(100);
            //builder.Property(e => e.Country).HasMaxLength(100);
            //builder.Property(e => e.PostalCode).HasMaxLength(50);
            //builder.Property(e => e.CompanyId);
        }
    }
}
