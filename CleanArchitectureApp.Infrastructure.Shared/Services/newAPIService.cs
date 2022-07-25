using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using NewsAPI;
using NewsAPI.Models;
using NewsAPI.Constants;
using System.Threading.Tasks;
using Rest;
using System.Net.Http.Headers;

namespace CleanArchitectureApp.Infrastructure.Shared.Services
{
    public class newAPIService
    {      
        public async Task<string> NewHeadLine()
        {
            var responseApi = new HeadLineResponse();
            string response = "";


            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("Get", "application/json");
                 response = await client.GetStringAsync("http://newsapi.org/v2/top-headlines?country=za&apiKey=2b0f0d99644d4ec68cd72722dfb7cce6");
          

                //var jsonString = await response.Content.ReadAsStringAsync().Result;
                //responseApi = JsonConvert.DeserializeObject<HeadLineResponse>(jsonString);
            }

            return response;

        }


    }
    public class HeadLineResponse
    {
        public string status { get; set; }
        public int totalResults { get; set; }
        public List<Article> articles { get; set; }
    }

    public class Article
    {
        public Source source { get; set; }
        public string author { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public string url { get; set; }
        public string urlToImage { get; set; }
        public DateTime publishedAt { get; set; }
        public string content { get; set; }
    }


    public class Source
    {
        public string id { get; set; }
        public string name { get; set; }
    }

}
