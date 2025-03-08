using aquaMaintenance.backEnd.Models;
using aquaMaintenance.backEnd.services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace aquaMaintenance.backEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WaterParametersController : ControllerBase
    {
        private readonly IWaterParametersDataService _waterParametersDataService;
        public WaterParametersController(IWaterParametersDataService waterParametersDataService)
        {
            _waterParametersDataService = waterParametersDataService;
        }

        // GET: api/<WaterParametersController>
        [HttpGet]
        public IEnumerable<WaterParameter> Get()
        {
            try
            {
                var result = _waterParametersDataService.GetAll();
                return result;

            }
            catch (Exception)
            {

                throw;
            }
        }

        // GET api/<WaterParametersController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<WaterParametersController>
        [HttpPost]
        public void Post([FromBody] WaterParameter value)
        {
            try
            {
                _waterParametersDataService.Create(value);
            }
            catch (Exception)
            {

                throw;
            }
        }

        // PUT api/<WaterParametersController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<WaterParametersController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
