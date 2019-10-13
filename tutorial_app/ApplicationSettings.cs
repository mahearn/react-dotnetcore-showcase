using System;
using Microsoft.Extensions.Configuration;

namespace tutorial_app.Models
{
  public class ApplicationSettings
  {
    public IConfigurationSection ApiSettings { get; set; }

    public ApplicationSettings()
    {
      var builder = new ConfigurationBuilder()
          .AddJsonFile("appsettings.json")
          .Build();

      ApiSettings = builder.GetSection("UnsplashApi");
    }

    public string BaseUri => ApiSettings["BaseUri"];

    public string AccessKey => ApiSettings["AccessKey"];

    public string SecretKey => ApiSettings["SecretKey"];
  }
}