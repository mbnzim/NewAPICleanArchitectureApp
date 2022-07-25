using CleanArchitectureApp.Application.DTOs.Authentication;
using CleanArchitectureApp.Application.Interfaces.Services;
using CleanArchitectureApp.Infrastructure.Shared.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace CleanArchitectureApp.WebApi.Controllers.V1
{
    [ApiController]
   // [EnableCors(origins: "http://mywebclient.azurewebsites.net", headers: "*", methods: "*")]
    public class NewsAPIController : ControllerBase
    {
        private readonly newAPIService newapiService;

        public NewsAPIController(newAPIService newapiService)
        {
            this.newapiService = newapiService;
        }

        //[AllowAnonymous]
        //[HttpGet("newsApi")]
        //public async Task<ActionResult<string>> NewHeadLineAsync()
        //{
        //    var test = await this.newapiService.NewHeadLine();
        //    return test;
        //}
    }
}
