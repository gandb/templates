

class ServerConfig
{
  //urls to servers config
  public frontEndHostname:string = "http://localhost:8080";
  public backEndHostname =  "http://localhost:80";

  //login config
  public loginFacebookEnabled:boolean = true;
  public loginDebugEnabled:boolean = true;
  public loginGoogleEnabled:boolean = true;
  
}

export default new ServerConfig();