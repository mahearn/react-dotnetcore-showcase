using System.Threading.Tasks;
using System.Net.Http;
using System.Text;
using tutorial_app.ServiceImplementations;
using tutorial_app.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Cors;
using System.Diagnostics;

namespace tutorial_app.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  [EnableCors("DefaultPolicy")]
  public class GalleryController : ControllerBase
  {
    
    [HttpGet("[action]")]
    public async Task<string> GetPhotos(string query)
    {
      try
      {
        PhotosService _photosService = new PhotosService();
        PhotoList response = await _photosService.SearchPhotos(query);
        var photos = JsonConvert.SerializeObject(response.results);
        return photos;
      }
      catch (System.Exception ex)
      {
        Debug.WriteLine(ex); 
        return ex.Message; 
      }
      
    }

  }
}
