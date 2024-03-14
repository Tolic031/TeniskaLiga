namespace Backend.Models
{
    public class Natjecatelj: Entitet
    {
        public string? Ime { get; set; }
        public string? Prezime { get; set; }
        public string? Broj_Telefona { get; set; }
        public string? Email { get; set; }
        public bool? Clan { get; set; }
    }
}
