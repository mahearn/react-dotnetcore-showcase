using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using tutorial_app.Models;
using tutorial_app.ServiceInterfaces;
using Newtonsoft.Json;

namespace tutorial_app.ServiceImplementations
{
  public class PhotosService : IPhotosService
  {
    HttpClient client = new HttpClient();
    ApplicationSettings appSettings = new ApplicationSettings();

    // public async Task<PhotoList> SearchPhotos(string filter)
    // {
    //   string clientId = appSettings.AccessKey;
    //   var requestUri = $"{appSettings.BaseUri}search/photos?client_id={clientId}&page=1&query={filter}";
    //   var request = await client.GetStringAsync(requestUri);
    //   var result = JsonConvert.DeserializeObject<PhotoList>(request);
    //   return result;
    // }

    public async Task<PhotoList> SearchPhotos(string filter)
    {
      string clientId = appSettings.AccessKey;
      var requestUri = $"{appSettings.BaseUri}search/photos?client_id={clientId}&query={filter}";
      using (HttpResponseMessage res = await client.GetAsync(requestUri))
      using (HttpContent content = res.Content)
      {
          string data = await content.ReadAsStringAsync();
          if (data != null)
          {
            var result = JsonConvert.DeserializeObject<PhotoList>(data);
            return result;
          }
      }
      return null;
    }

  }
}
