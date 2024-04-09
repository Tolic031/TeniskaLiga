using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
  public record NatjecateljDTORead (string Ime, string Prezime, string Broj_Telefona, string? Email, bool Clan);

    public record NatjecateljDTOInsertUpdate(
        [Required(ErrorMessage = "Ime obavezno")]
        string Ime,
        [Required(ErrorMessage = "Prezime obavezno")]
        string Prezime,
        [Required(ErrorMessage = "Broj telefona obavezno")]
        string Broj_Telefona,
        [Required(ErrorMessage = "Član obavezno")]
        bool Clan



        );
}
