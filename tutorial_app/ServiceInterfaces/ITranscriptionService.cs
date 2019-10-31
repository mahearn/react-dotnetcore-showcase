using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using tutorial_app.Models;

namespace tutorial_app.ServiceInterfaces
{
    public interface ITranscriptionService
    {
        Task<string> PostAsync(AudioFile model);
        Task<string> GetAsync();
    }
}
