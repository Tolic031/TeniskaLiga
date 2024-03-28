using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class NatjecateljController:ControllerBase
    {
        private readonly TeniskaLigaContext _context;

        //Dependency injection
        //U konstruktoru primiš instancu i dodijeliš privatnom svojstvu

        public NatjecateljController(TeniskaLigaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult Get()
        {
            return new JsonResult(_context.Natjecatelji.ToList());
        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetById(int id)
        {
            return new JsonResult(_context.Natjecatelji.Find(id));
        }

        [HttpPost]
        public ActionResult Post(Natjecatelj natjecatelj)
        {

            _context.Natjecatelji.Add(natjecatelj);
            _context.SaveChanges();
            return new JsonResult(natjecatelj);
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Produces("application/json")]

        public ActionResult Delete(int id)
        {
            var SmjerIzBaze = _context.Natjecatelji.Find(id);

            _context.Natjecatelji.Remove(SmjerIzBaze);
            _context.SaveChanges();
            return new JsonResult(new { poruka = "obrisano" });

        }

        [HttpPut]
        [Route("{id:int}")]

        public IActionResult Put(int id, Natjecatelj natjecatelj)
        {

            var SmjerIzBaze = _context.Natjecatelji.Find(id);
            SmjerIzBaze.Ime = natjecatelj.Ime;
            SmjerIzBaze.Prezime = natjecatelj.Prezime;
            SmjerIzBaze.Broj_Telefona = natjecatelj.Broj_Telefona;
            SmjerIzBaze.Email = natjecatelj.Email;
            SmjerIzBaze.Clan = natjecatelj.Clan;

            _context.Natjecatelji.Update(SmjerIzBaze);
            _context.SaveChanges();

            return new JsonResult(SmjerIzBaze);





        }





       
    }
}
