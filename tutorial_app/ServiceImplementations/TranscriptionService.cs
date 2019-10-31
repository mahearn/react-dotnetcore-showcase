using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.IO;
using tutorial_app.Models;
using tutorial_app.ServiceInterfaces;
using Microsoft.Extensions.Configuration;
using System.Net;

namespace tutorial_app.ServiceImplementations
{
    public class TranscriptionService : ITranscriptionService
    {
        HttpClient client = new HttpClient();

        public async Task<string> PostAsync(AudioFile model)
        {
            ApplicationSettings _config = new ApplicationSettings();
            var baseUri = _config.TranscriptionBaseUri;
            var token = _config.TranscriptionApiToken;
            HttpStatusCode StatusCode = new HttpStatusCode();

            try
            {
                using (var client = new HttpClient())
                {
                    try
                    {
                        client.BaseAddress = new Uri(baseUri);
                        var file = model.File;
                        byte[] data;
                        using (var br = new BinaryReader(file.OpenReadStream()))
                            data = br.ReadBytes((int)file.OpenReadStream().Length);

                        ByteArrayContent bytes = new ByteArrayContent(data);
                        MultipartFormDataContent multiContent = new MultipartFormDataContent();
                        multiContent.Add(bytes, "file", file.FileName);

                        // var result = await client.PostAsync("api/Values", multiContent);
                        var result = await client.PostAsync(client.BaseAddress, multiContent);

                        StatusCode = result.StatusCode; //201 Created the request has been fulfilled, resulting in the creation of a new resource.

                    }
                    catch (Exception)
                    {
                        return "500"; // 500 is generic server error
                    }
                    
                }

                return "400"; // 400 is bad request

            }
            catch (Exception)
            {
                return "500"; // 500 is generic server error
            }
        }

        public async Task<string> GetAsync()
        {
            return "";
        }

    }
}
