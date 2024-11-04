 
class ServerConfig
{
  //url to servers config
  public frontEndHostname = "https://valert.vriend.com.br/";
  public backEndHostname =  "https://southamerica-east1-v-alert.cloudfunctions.net/all";  

  //login config
  public loginFacebookEnabled:boolean = true;
  public loginDebugEnabled:boolean = true;
  public loginGoogleEnabled:boolean = true;
  
}

export default new ServerConfig();

