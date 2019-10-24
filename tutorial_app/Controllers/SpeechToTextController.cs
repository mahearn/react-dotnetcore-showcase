using System;
using System.IO;
using System.Threading.Tasks;
using System.Net.Http;
using Microsoft.AspNetCore.Hosting;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Mvc.Formatters.Json;
using Newtonsoft.Json;
using tutorial_app.ServiceImplementations;
using tutorial_app.Models;
using tutorial_app.ServiceInterfaces;

namespace tutorial_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("DefaultPolicy")]
    public class SpeechToTextController : ControllerBase
    {
        private IHostingEnvironment _hostingEnvironment;
        private ITranscriptionService _transcriptionService;
        
        public SpeechToTextController(
            IHostingEnvironment hostingEnvironment, 
            ITranscriptionService transcriptionService)
        {
            _hostingEnvironment = hostingEnvironment;
            _transcriptionService = transcriptionService;
        }

        HttpClient client = new HttpClient();

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
        public async Task<IActionResult> PostAsync([FromForm]IFormFile body)
        {
            byte[] fileBytes;
            using (var memoryStream = new MemoryStream())
            {
                await body.CopyToAsync(memoryStream);
                fileBytes = memoryStream.ToArray();
            }

            var filename = body.FileName;
            var contentType = body.ContentType;

            //TranscriptionService _transcriptionService = new TranscriptionService();
            var result = _transcriptionService.PostAsync(fileBytes);
            return Ok();
        }

        // [HttpPost]
        // public string DoUploadAudioFile([FromBody] IFormFile file)
        // {
        //     try
        //     {
        //         TranscriptionService _transcriptionService = new TranscriptionService();
        //         var result = _transcriptionService.PostAsync();
        //         return "yes";
        //     }
        //     catch (System.Exception ex)
        //     {
        //         Debug.WriteLine(ex);
        //         return ex.Message;
        //     }

        // }

        // [HttpPost, DisableRequestSizeLimit]
        // public ActionResult UploadFile([FromBody] IFormFile file)
        // {
        //     try
        //     {
        //         //var file = Request.Form.Files[0];
        //         // string folderName = "Upload";
        //         // string webRootPath = _hostingEnvironment.WebRootPath;
        //         // string newPath = Path.Combine(webRootPath, folderName);
        //         // if (!Directory.Exists(newPath))
        //         // {
        //         //     Directory.CreateDirectory(newPath);
        //         // }
        //         if (file.Length > 0)
        //         {
                    
        //             TranscriptionService _transcriptionService = new TranscriptionService();
        //             var result = _transcriptionService.PostAsync(file);
        //         }
                
        //         return Ok("Upload Successful.");
        //     }
        //     catch (System.Exception ex)
        //     {
        //         return Ok("Upload Failed: " + ex.Message);
        //     }
        // }

        [HttpGet]
        public async Task<Transcription> GetTranscriptionAsync()
        {
            var transcription = await _transcriptionService.GetAsync();
            var model = JsonConvert.DeserializeObject<Transcription>(transcription);
            return model;
        }
    }
}
