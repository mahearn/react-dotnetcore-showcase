using System;
using System.Collections.Generic;

namespace tutorial_app.Models
{

  public class PhotoList
  {
    public int total { get; set; }
    public int total_pages { get; set; }
    public List<Results> results { get; set; }
  }

  public class Results
  {
    public string id { get; set; }
    public DateTime created_at { get; set; }
    public int width { get; set; }
    public int height { get; set; }
    public string color { get; set; }
    public int likes { get; set; }
    public bool liked_by_user { get; set; }
    public string description { get; set; }
    public User user { get; set; }
    public List<object> current_user_collections { get; set; }
    public Urls urls { get; set; }
    public Links2 links { get; set; }
  }

  public class ProfileImage
  {
    public string small { get; set; }
    public string medium { get; set; }
    public string large { get; set; }
  }

  public class Links
  {
    public string self { get; set; }
    public string html { get; set; }
    public string photos { get; set; }
    public string likes { get; set; }
  }

  public class User
  {
    public string id { get; set; }
    public string username { get; set; }
    public string name { get; set; }
    public string first_name { get; set; }
    public string last_name { get; set; }
    public string instagram_username { get; set; }
    public string twitter_username { get; set; }
    public string portfolio_url { get; set; }
    public ProfileImage profile_image { get; set; }
    public Links links { get; set; }
  }

  public class Urls
  {
    public string raw { get; set; }
    public string full { get; set; }
    public string regular { get; set; }
    public string small { get; set; }
    public string thumb { get; set; }
  }

  public class Links2
  {
    public string self { get; set; }
    public string html { get; set; }
    public string download { get; set; }
  }
}