using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
  public record NatjecateljDTORead (int Id, string Ime, string Prezime, string Broj_Telefona, string? Email, bool Clan);

    public record NatjecateljDTOInsertUpdate(
        [Required(ErrorMessage = "Ime obavezno")]
        string Ime,
        [Required(ErrorMessage = "Prezime obavezno")]
        string Prezime,
        [Required(ErrorMessage = "Broj telefona obavezno")]
        string Broj_Telefona,
        [Required(ErrorMessage = "Email obavezno")]
        string Email,
        [Required(ErrorMessage = "Član obavezno")]
        bool Clan);

    public record SezonaDTORead(int Id, DateTime PocetakSezone, DateTime KrajSezone, string Cijena );

    public record SezonaDTOInsertUpdate(
        [Required(ErrorMessage = "Unesi datum početka sezone")]
        DateTime PocetakSezone,
        [Required(ErrorMessage = "Unesi datum završetka sezone")]
        DateTime KrajSezone,
        [Required(ErrorMessage = "Unesi cijenu")]
        decimal Cijena);



    public record MecDTORead (
        int Id,
        string? Ime,
        string? IzazvaniImePrezime,
        DateTime? Datum,
        string? Red,
        string? Napomena,
        DateTime? SezonaPocetak,
        DateTime? SezonaKraj,
        string? PobjednikImePrezime
        );

    public record MecDTOInsertUpdate(
       int? IzazivacId,
       int? IzazvaniId,
       DateTime? Datum,
       string? Red,
       string? Napomena,
       int? SezonaId,
       int? PobjednikId
       );


}
