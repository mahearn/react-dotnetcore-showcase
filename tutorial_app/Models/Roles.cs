using System;
using System.Collections.Generic;

namespace tutorial_app.Models
{
    public class Roles
    {
        public string Title { get; set; }
        public string Company { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
        public bool IsCurrent { get; set; } = false; 
        public IEnumerable<Achievement> Achievements { get; set; }
    }

    public class Achievement
    {
        public string name { get; set; }
    }
}