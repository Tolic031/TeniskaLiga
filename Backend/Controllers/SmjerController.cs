using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class SmjerController
    {
        private readonly EdunovaContext _context;

        //Dependency injection
        //U konstruktoru primiš instancu i dodijeliš privatnom svojstvu

        public SmjerController(EdunovaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult Get()
        {
            return new JsonResult(_context.Natjecatelji.ToList());
        }

        [HttpPost]
        public ActionResult Post(Natjecatelj natjecatelj)
        {

            _context.Natjecatelji.Add(natjecatelj);
            _context.SaveChanges();
            return new JsonResult(natjecatelj);
        }

       
    }
}
