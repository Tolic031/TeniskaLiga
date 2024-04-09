using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Mec:Entitet
    {
        [ForeignKey("izazivac")]
        public required Izazivac Izazivac { get; set; }

        [ForeignKey("izazvani")]
        public required Izazvani Izazvani { get; set; }
        public string? Pobjednik { get; set; }
        public DateTime? Datum { get; set; }
        public int? Red { get; set; }
        public string? Napomena { get; set; }

        [ForeignKey("sezona")]
        public Sezona? Sezona { get; set; }

        [ForeignKey("natjecatelj")]
        public Natjecatelj? Natjecatelj { get; set; }


    }
}
