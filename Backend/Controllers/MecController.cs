using Backend.Data;
using Backend.Models;
using Backend.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class MecController : UniverzalniController<Mec, MecDTORead, MecDTOInsertUpdate>
    {
        public MecController(TeniskaLigaContext context) : base(context)
        {
            DbSet = _context.Mecevi;
            _mapper = new MecMapper();
        }
        protected override void KontrolaBrisanje(Mec entitet)
        {
           
        }

        protected override Mec KreirajEntitet(MecDTOInsertUpdate dto)
        {
            var izazivac = _context.Natjecatelji.Find(dto.IzazivacId) ?? throw new Exception("Ne postoji natjecatelj s šifrom " + dto.IzazivacId + " u bazi");
            var izazvani = _context.Natjecatelji.Find(dto.IzazvaniId) ?? throw new Exception("Ne postoji natjecatelj s šifrom " + dto.IzazvaniId + " u bazi");
            var pobjednik = _context.Natjecatelji.Find(dto.PobjednikId) ?? throw new Exception("Ne postoji natjecatelj s šifrom " + dto.PobjednikId + " u bazi");
            var sezona = _context.Sezone.Find(dto.SezonaId) ?? throw new Exception("Nema sezone");
            var entitet = new Mec
            {
                Izazivac = izazivac,
                Izazvani = izazvani,
                Red = dto.Red,
                Napomena = dto.Napomena,
                Datum = dto.Datum
            };

            entitet.Izazivac = izazivac;
            entitet.Izazvani = izazvani;
            entitet.Pobjednik = pobjednik;
            entitet.Sezona = sezona;
            return entitet;
        }

        protected override List<MecDTORead> UcitajSve()
        {
            var lista = _context.Mecevi
                    .Include(g => g.Pobjednik)
                    .Include(g => g.Izazvani)
                    .Include(g => g.Izazivac)
                    .Include(g => g.Sezona)
                    .ToList();
            if (lista == null || lista.Count == 0)
            {
                throw new Exception("Ne postoje podaci u bazi");
            }
            return _mapper.MapReadList(lista);
        }

        protected override Mec NadiEntitet(int id)
        {
            return _context.Mecevi.Include(g => g.Pobjednik)
                    .Include(g => g.Izazvani)
                    .Include(g => g.Izazivac)
                    .Include(g => g.Sezona).FirstOrDefault(x => x.Id == id) ?? throw new Exception("Ne postoji meč s šifrom " + id + " u bazi");
        }



        protected override Mec PromjeniEntitet(MecDTOInsertUpdate dto, Mec entitet)
        {
            var izazivac = _context.Natjecatelji.Find(dto.IzazivacId) ?? throw new Exception("Ne postoji natjecatelj s šifrom " + dto.IzazivacId + " u bazi");
            var izazvani = _context.Natjecatelji.Find(dto.IzazvaniId) ?? throw new Exception("Ne postoji natjecatelj s šifrom " + dto.IzazvaniId + " u bazi");
            var pobjednik = _context.Natjecatelji.Find(dto.PobjednikId) ?? throw new Exception("Ne postoji natjecatelj s šifrom " + dto.PobjednikId + " u bazi");
            var sezona = _context.Sezone.Find(dto.SezonaId) ?? throw new Exception("Nema sezone");


            /*
            List<Polaznik> polaznici = entitet.Polaznici;
            entitet = _mapper.MapInsertUpdatedFromDTO(dto);
            entitet.Polaznici = polaznici;
            */

            // ovdje je možda pametnije ići s ručnim mapiranje
            entitet.Napomena = dto.Napomena;
            entitet.Datum=dto.Datum;
            entitet.Izazivac = izazivac;
            entitet.Izazvani = izazvani;
            entitet.Pobjednik = pobjednik;
            entitet.Sezona = sezona;

            return entitet;
        }
    }
}