using System;
using Microsoft.Extensions.Configuration;

namespace tutorial_app.Models
{
  public class ApplicationSettings
  {
    public IConfigurationSection ImageApiSettings { get; set; }
    public IConfigurationSection TranscriptionApiSettings { get; set; }

    public ApplicationSettings()
    {
      var builder = new ConfigurationBuilder()
          .AddJsonFile("appsettings.json")
          .Build();

      ImageApiSettings = builder.GetSection("UnsplashApi");
      TranscriptionApiSettings = builder.GetSection("AssemblyAI");
    }

    public string BaseUri => ImageApiSettings["BaseUri"];
    public string AccessKey => ImageApiSettings["AccessKey"];
    public string SecretKey => ImageApiSettings["SecretKey"];
    public string TranscriptionBaseUri => TranscriptionApiSettings["BaseUri"];
    public string TranscriptionApiToken => TranscriptionApiSettings["ApiToken"];
  }
}