using System;
using Microsoft.Extensions.Configuration;

namespace tutorial_app.Models
{
  public class ApplicationSettings
  {
    public IConfigurationSection ImageApiSettings { get; set; }

    public ApplicationSettings()
    {
      var builder = new ConfigurationBuilder()
          .AddJsonFile("appsettings.json")
          .Build();

      ImageApiSettings = builder.GetSection("UnsplashApi");
    }

    public string BaseUri => ImageApiSettings["BaseUri"];
    public string AccessKey => ImageApiSettings["AccessKey"];
    public string SecretKey => ImageApiSettings["SecretKey"];
  }
}