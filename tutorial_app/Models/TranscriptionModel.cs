using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;

namespace tutorial_app.Models
{

    public class AudioFile
    {
        public IFormFile File { get; set; }
        public string Source { get; set; }
        public long Size { get; set; }
        public string Extension { get; set; }   
    }
    
    public class Transcription
    {
        public string acoustic_model { get; set; } = "assemblyai_en_au";
        public double audio_duration { get; set; }
        public string audio_url { get; set; }
        public double confidence { get; set; }
        public object dual_channel { get; set; }
        public bool format_text { get; set; }
        public string id { get; set; }
        public string language_model { get; set; }
        public bool punctuate { get; set; }
        public string status { get; set; }
        public string text { get; set; }
        public object utterances { get; set; }
        public object webhook_status_code { get; set; }
        public object webhook_url { get; set; }
        public List<Word> words { get; set; }
    }

    public class Word
    {
        public double confidence { get; set; }
        public int end { get; set; }
        public int start { get; set; }
        public string text { get; set; }
    }

}
