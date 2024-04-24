using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Text;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class SezonaController : UniverzalniController<Sezona, SezonaDTORead, SezonaDTOInsertUpdate>
    {
        public SezonaController(TeniskaLigaContext context) : base(context)
        {
            DbSet = _context.Sezone;
        }
        protected override void KontrolaBrisanje(Sezona entitet)
        {
            var lista = _context.Mecevi
                .Where(x => x.Izazivac.Id == entitet.Id || x.Izazvani.Id == entitet.Id
                || x.Pobjednik!.Id == entitet.Id)
                .ToList();
            if (lista != null && lista.Count > 0)
            {
                StringBuilder sb = new();
                sb.Append("Sezona se ne može obrisati ");
                foreach (var e in lista)
                {
                    sb.Append(e.Napomena).Append(", ");
                }
                throw new Exception(sb.ToString()[..^2]); // umjesto sb.ToString().Substring(0, sb.ToString().Length - 2)
            }
        }

    }
}