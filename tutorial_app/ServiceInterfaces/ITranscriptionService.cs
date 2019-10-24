using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

using tutorial_app.Models;

namespace tutorial_app.ServiceInterfaces
{
    public interface ITranscriptionService
    {
        string PostAsync(byte[] fileBytes);
        Task<string> GetAsync();
    }
}
