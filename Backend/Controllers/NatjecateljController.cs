using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Text;
using static Backend.Controllers.UniverzalniController;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class NatjecateljController : EdunovaController<Natjecatelj, NatjecateljDTORead, NatjecateljDTOInsertUpdate>
    {
        public NatjecateljController(TeniskaLigaContext context) : base(context)
        {
            DbSet = _context.Natjecatelji;
        }
        protected override void KontrolaBrisanje(Natjecatelj entitet)
        {
            var lista = _context.Mecevi
                .Where(x => x.Natjecatelj.Id == entitet.Id)
                .ToList();
            if (lista != null && lista.Count > 0)
            {
                StringBuilder sb = new();
                sb.Append("Natjecatelj se ne može obrisati jer je postavljen na mečevima: ");
                foreach (var e in lista)
                {
                    sb.Append(e.Natjecatelj).Append(", ");
                }
                throw new Exception(sb.ToString()[..^2]); // umjesto sb.ToString().Substring(0, sb.ToString().Length - 2)
            }
        }

    }
}