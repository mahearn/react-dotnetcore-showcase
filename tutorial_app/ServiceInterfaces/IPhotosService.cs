using System;
using System.Threading.Tasks;
using tutorial_app.Models;

namespace tutorial_app.ServiceInterfaces
{
  public interface IPhotosService
  {
    Task<PhotoList> SearchPhotos(string filter);
    //Task<PhotoList> GetCollections(string filter);
  }
}
