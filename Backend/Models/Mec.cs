using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Mec:Entitet
    {
        [ForeignKey("izazivac")]
        public required Natjecatelj Izazivac { get; set; }

        [ForeignKey("izazvani")]
        public required Natjecatelj Izazvani { get; set; }
        public DateTime? Datum { get; set; }
        public string? Red { get; set; }
        public string? Napomena { get; set; }

        [ForeignKey("sezona")]
        public Sezona? Sezona { get; set; }

        [ForeignKey("pobjednik")]
        public Natjecatelj? Pobjednik { get; set; }


    }
}
