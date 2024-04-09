using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class TeniskaLigaContext:DbContext
    {

        public TeniskaLigaContext(DbContextOptions<TeniskaLigaContext>options)
            : base(options) {
        }

        public DbSet<Natjecatelj>Natjecatelji { get; set; }
        public DbSet<Sezona> Sezone { get; set; }

        public DbSet<Mec>Mecevi { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Mec>().HasOne(m => m.Izazivac);
            modelBuilder.Entity<Mec>().HasOne(m => m.Izazvani);
            modelBuilder.Entity<Mec>().HasOne(m => m.Sezona);
            modelBuilder.Entity<Mec>().HasOne(m => m.Natjecatelj);
        }



    }
}
