using System.IO;
using System.Threading.Tasks;
using System.Net.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using tutorial_app.ServiceImplementations;
using tutorial_app.Models;
using System.Diagnostics;

namespace tutorial_app.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("DefaultPolicy")]
    public class TranscriberController : ControllerBase
    {
        //private IHostingEnvironment _hostingEnvironment;
        //private ITranscriptionService _transcriptionService;
        
        // public TranscriberController(
        //     IHostingEnvironment hostingEnvironment, 
        //     ITranscriptionService transcriptionService)
        // {
        //     _hostingEnvironment = hostingEnvironment;
        //     _transcriptionService = transcriptionService;
        // }

        HttpClient client = new HttpClient();
        TranscriptionService transcriptionService = new TranscriptionService();

        // upload file for translation:
        /*
        curl --request POST \
        -v \
        --data-binary \
        --url https://api.assemblyai.com/v2/upload \
        --header 'authorization: YOUR-API-TOKEN' \
        -H "Transfer-Encoding: chunked" \
        -T /path/to/your/audio.wav
         */

        [HttpPost("[action]")]
        [Route("api/Transcriber/FileUpload")]
        public async Task<IActionResult> FileUpload([FromForm] IFormFile file)
        {
            AudioFile model = new AudioFile();
            model.File = file;
            TranscriptionService _transcriptionService = transcriptionService;
            byte[] fileBytes;

            if (file.Length > 0)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await file.CopyToAsync(memoryStream);
                    fileBytes = memoryStream.ToArray();
                }
                var result = await _transcriptionService.PostAsync(fileBytes);
                return Ok();
            }
            return BadRequest();
        }

        // public async Task<IActionResult> PostAsync([FromForm] IFormFile body)
        // {  
        //     try
        //     {
        //         TranscriptionService _transcriptionService = transcriptionService;
        //         byte[] fileBytes;
        //         using (var memoryStream = new MemoryStream())
        //         {
        //             await body.CopyToAsync(memoryStream);
        //             fileBytes = memoryStream.ToArray();
        //         }

        //         var filename = body.FileName;
        //         var contentType = body.ContentType;
        //         var result = _transcriptionService.PostAsync(fileBytes, filename, contentType);
        //         return Ok();    
        //     }
        //     catch (System.Exception e)
        //     {
        //         Debug.WriteLine(e.Message);
        //         throw;
        //     }
        // }

        [HttpGet]
        public string GetStringAsync(string hello)
        {
            var stringReturn = JsonConvert.SerializeObject(hello);
            return stringReturn;
        }

        [HttpGet]
        public async Task<Transcription> GetTranscriptionAsync()
        {
            TranscriptionService _transcriptionService = transcriptionService;
            var transcription = await _transcriptionService.GetAsync();
            var model = JsonConvert.DeserializeObject<Transcription>(transcription);
            return model;
        }
    }
}
