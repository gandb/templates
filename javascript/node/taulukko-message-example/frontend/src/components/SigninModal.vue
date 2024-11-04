<template>

  <modal :open="openModal" @onBackgroundClick="onBackgroundClick" 
    @onDiceClick="onDiceClick" 
    width="720px"
    height="400px"
    title="Entre usando sua conta favorita">
       <div slot="header"></div>
      <div class="t-signin" slot="content"> 
        <div class="t-signin-content">
          <div class="t-segment">
            <div class="ui negative message" v-if="!faceEnabled & showFaceError">
                <i class="close icon" @click="fecharAvisoFace"></i>
                <div class="header">
                  Lamentamos mas o Facebook está indisponível neste momento
                </div>
                <p>Tente entrar com outro provedor de conta ou tente entrar mais tarde.</p>
            </div>
              <div class="t-debug-mode" v-if="debugMode">
                <div class="field">
                  <div class="ui left icon input">
                    <i class="user icon"></i>
                    <input v-model="debugEmail" type="text" name="email" placeholder="E-mail address">
                  </div>
                </div>
                <div class="field">
                  <div class="ui left icon input">
                    <i class="lock icon"></i>
                    <input v-model="debugPassword" type="password" name="password" placeholder="Password">
                  </div>
                </div>
                <button class="t-option-login ui fluid large orange button" @click="loginDebugMode"> 
                  <i class="user icon"></i>Login in debug Mode</button>
              </div>
                
              <button  v-if="faceEnabled && !loading" 
                class="t-option-login t-facebook-option ui fluid large button" 
                @click="onFacebookLogin">  
                <div class="t-facebook-button"><i class="facebook icon"></i></div>
                Facebook</button>
              <div v-show="!loading" id="google-button" class="t-button-login t-option-login"></div>
              <div  v-show="loading">
                <h2 class="ui header">
                  <i class="plug icon"></i>
                  <div class="content">
                    Redirecionando...  
                    <div class="sub header t-redirect-message">{{loadingMessage}}</div>
                  </div>
                </h2>
              </div> 
          </div>  
        </div>
      
      </div>
      <div slot="footer"></div>
   </modal>
 
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
  import bus from "@/bus";
  import  axios from 'axios'; 
  import UserStatus from "@/UserStatus";
  import Modal from '@/components/Modal.vue';

  const TIME_GLOBAL_UPDATE = 50;  

     @Component({name: 'SigninModal', 
		components: {
      Modal
		}
	  } )
  export default class SigninModal extends Vue {

    @Prop(  {required: true, type : Boolean, default:false} ) openModal !: boolean ;
        
    debugMode:boolean = false;
    debugModeCounter:number=0;

    loading=false;
    loadingMessage="";
    faceEnabled=true;
    showFaceError=true;

    debugPassword:string = "";
    debugEmail:string= "" ;

    mounted()
    {
       bus.store = this.$store;
        this.debugMode = bus.debugMode;
    }

    private listennerClickGoogleButton()
    { 
        const googleButton =  document.getElementById("google-button");
        if(!googleButton)
        {
            console.error("googleButton não foi criado");
            return;
        }

        (googleButton as HTMLElement).addEventListener("click", ()=>{
            bus.autoLogin = true;
            this.loading=true;
            this.loadingMessage = "Aguarde enquanto recebemos a validação do seu login feito no Google...";
        });

    }
      
    onFailureGoogleLogin(error:any) {
       console.error(error);
     }

    //Google Signin serverside flow
     //https://developers.google.com/identity/sign-in/web/server-side-flow
    onSuccessGoogleLogin(googleUser:any) {
          const session_token = bus.taulukkoToken ;

          if(!bus.autoLogin)
          {
            //unnable to auto-login 
            return;
          } 
          const alreadyLogged = session_token !=null && session_token!="";

          if(alreadyLogged)
          {
            bus.emitOnRequestUpdateUserInfo(session_token);
            return;
          }   

          bus.emitOnAfterGoogleLogin(googleUser);
     }

     onBackgroundClick()
     {
       console.log("Fechando login");
       this.$emit("onBackgroundClick");
     }

    onDiceClick()
    { 
      const oldValue = this.debugMode;

      this.debugModeCounter++;

      if(this.debugModeCounter%20==0)
      {
          this.debugMode=false;
      }
      else if(this.debugModeCounter%10==0)
      {
        this.debugMode=true;
      }
      else
      {
        return;
      }

      if(oldValue!=this.debugMode)
      {
        bus.emitOnDebugModeChange(this.debugMode);
      }
    }

    onFacebookLogin(e:Event)
    {
        this.loading = true;
        this.loadingMessage = "Você está sendo redirecionado para o login do Facebook";
        bus.logout();

        bus.autoLogin = true;

        bus.api.get('/backend/getFacePairs'  )
        .then(  (response) => {
          const pairs =  response.data;

          bus.facebook =  JSON.stringify(pairs);

          const facebookDialogURL:string = `http://www.facebook.com/dialog/oauth?state=${pairs.public}&client_id=${bus.facebookClientId}&scope=email&redirect_uri=${this.$store.getters.backendHostname}/backend/checkFaceCode/`;

          window.location.href = facebookDialogURL;

        })
        .catch(  (error) => {
          // handle error
          console.error("onFacebookLogin error",error); 
          this.loading = false;
          throw error;

        })
        .then(  () => {
          // always executed
        });
    } 

    fecharAvisoFace()
    {
      this.showFaceError=false;
    } 

    private createGoogleButton()
    {
      const creeateButton = ( )=>{
        const gapi:any= (window as any).gapi;
          gapi.signin2.render('google-button', {
          'scope': 'profile email',
          'width': 600,
          'height': 100, 
          'longtitle': true,
          'theme': 'dark',
          'onsuccess': this.onSuccessGoogleLogin,
          'onfailure': this.onFailureGoogleLogin
        }); 
      };

      const gapi:any= (window as any).gapi;
      const alreadyCreatedGAPI = gapi;
      if(alreadyCreatedGAPI)
      {
          creeateButton();
          this.listennerClickGoogleButton();
      }
      else
      {
        bus.onCreateGAPI((g:any)=>{
          creeateButton();
          this.listennerClickGoogleButton();
        })         
      }
    }

    updated()
    { 
      if(this.openModal)
      {
          this.createGoogleButton(); 
      }
    } 

    private cleanup()
    {
      this.debugMode = false;
      this.debugModeCounter=0;
      this.loading=false;
      this.loadingMessage="";
      this.faceEnabled=true;
      this.showFaceError=true;
    }

    loginDebugMode()
    {
      console.log("loginDebugMode", 1, this.debugPassword , this.debugEmail);
        bus.api.post('/backend/checkPasswordLoginDebug' ,{password: this.debugPassword ,email: this.debugEmail} )
                    .then(  (response:any) => {
                       console.log("loginDebugMode", 2, response.data);
                        
                            const session_token =  response.data.token;
 
                            bus.emitOnRequestUpdateUserInfo(session_token);

                            const data:UserStatus = 
                            {token:response.data.token,success:true, 
                            //image:this.$store.state.constants.DEFAULT_IMAGE,from:"Debug"};
                            image:response.data.image,from:"Debug"};
                            bus.emitOnUpdateLoginStatus(data);
                            
                     
                      })
                      .catch(  (error:any) => {
                        console.log("loginDebugMode", 3, error);
                        // handle error
                        bus.autoLogin=false;
                        console.error("checkDebugLogin error, maybe backend server is offline " ,error);
                        const data:UserStatus = 
                        {token:"",success:false, image:this.$store.state.constants.DEFAULT_IMAGE,from:"Debug"};
                        bus.emitOnUpdateLoginStatus(data);

                      });
    }
 
    @Watch("openModal")
    onChangeOpenModal(newValue:boolean,oldValue:boolean)
    {
      if(newValue)
      {
        return;
      }
      this.cleanup();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .t-segment
    {
      height:fit-content;
      width:640px;
      margin-bottom: 30px;
    }
 

    /** Forádo app por causa do semantic-ui que se sobrepoe */
    #outergame .t-facebook-option
    {
      position:relative;
      height:98px;
      font-size: 36px;
      background-color: var(--facebook-blue,blue);
    }
 
    .t-facebook-button
    {
      position: absolute;
      left: 1px;
      top: 1px;
      background-color: white;
      height: 96px;
      width: 96px;
    }

    .t-facebook-button i
    {
      position: absolute;
      left: 40px;
      top: 35px;
    }

    .st-mobile .t-facebook-button i
    {
      position: absolute;
      left: 20px;
      top: 20px;
    }
     #outergame .st-mobile h2 .t-redirect-message
    {
      font-size: var(--lv1-mobile-font-size);
    }

    .t-debug-mode
    {
      display:none;
    }

    .st-debug .t-debug-mode
    {
      display:inherit;
    }

    .t-debug-mode .field 
    {
      margin-top: 1em;
      margin-left: 1em;
    }

    .t-debug-mode .field input
    {
      width: 25em;
    }

    .t-login-header
    {
      margin-top: -50px;
    }
 

    #t-body.debug .t-signin
    {
      height: 20em;
    }

    #outergame .t-signin .t-option-login 
    {
      margin-top:1em;
      color: var(--half-white,white);
    } 


    .t-login-invite 
    {
      font-size: 36px;
    }
</style>
