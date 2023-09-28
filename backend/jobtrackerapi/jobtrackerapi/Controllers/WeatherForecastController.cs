using jobtrackerapi.Data;
using Microsoft.AspNetCore.Mvc;

namespace jobtrackerapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly JobTrackerAPIDbContext dbContext;

       

        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(JobTrackerAPIDbContext dbContext, ILogger<WeatherForecastController> logger)
        {
            this.dbContext = dbContext;
            _logger = logger;
        }


        [HttpGet(Name = "GetWeatherForecast")]
        public IEnumerable<WeatherForecast> Get()
        {
            var users = dbContext.User.ToList();
            Console.WriteLine(users);
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }

    }
}