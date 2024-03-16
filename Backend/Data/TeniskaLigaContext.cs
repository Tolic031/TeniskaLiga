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

    }
}
