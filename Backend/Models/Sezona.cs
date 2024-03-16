using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Sezona:Entitet
    {
        [Column("Pocetak_sezone")]
        public DateTime? PocetakSezone { get; set; }

        [Column("Kraj_sezone")]
        public DateTime? KrajSezone { get; set; }
        public decimal? Cijena { get; set; }
    }
}
