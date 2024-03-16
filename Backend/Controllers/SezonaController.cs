using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class SezonaController:ControllerBase
    {
        private readonly TeniskaLigaContext _context;

       

        public SezonaController(TeniskaLigaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult Get()
        {
            return new JsonResult(_context.Sezone.ToList());
        }

        [HttpPost]
        public ActionResult Post(Sezona sezona)
        {

            _context.Sezone.Add(sezona);
            _context.SaveChanges();
            return new JsonResult(sezona);
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Produces("application/json")]

        public ActionResult Delete(int id)
        {
            var SmjerIzBaze = _context.Sezone.Find(id);

            _context.Sezone.Remove(SmjerIzBaze);
            _context.SaveChanges();
            return new JsonResult(new { poruka = "obrisano" });

        }

        [HttpPut]
        [Route("{id:int}")]

        public IActionResult Put(int id, Sezona sezona)
        {

            var SmjerIzBaze = _context.Sezone.Find(id);
            SmjerIzBaze.PocetakSezone = sezona.PocetakSezone;
            SmjerIzBaze.KrajSezone = sezona.KrajSezone;
            SmjerIzBaze.Cijena = sezona.Cijena;


            _context.Sezone.Update(SmjerIzBaze);
            _context.SaveChanges();

            return new JsonResult(SmjerIzBaze);





        }
    }
}
