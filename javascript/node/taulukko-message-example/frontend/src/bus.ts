 
  import Vue from "vue";
  import  axios, { AxiosInstance } from 'axios';  
  import UserStatus from "@/UserStatus";
  import { Route } from 'vue-router';
  import {Store } from 'vuex';
   import { StateVuexTaulukko, Shortcut } from './store/types';
 

   import {  Watch } from 'vue-property-decorator'; 

  class BusVue extends Vue
  {
  
      private _api !:AxiosInstance; 
      private updateDataInformationSemaphore:boolean = false; 
      public store!:Store<StateVuexTaulukko>;


      public pastelColors : Array<string> = [
         "#ACECD5","#FFF9AA","#FFD5B8","#FFB9B3",
         "#E0BBE4","#957DAD","#D291BC" ,"#FEC8D8","#FFDFD3",
         "#F692BC","#F4ADC6","#FDFD95","#AAC5E2","#6891C3",
         "#C1E7E3","#DCFFFB","#799FCB","#95B4CC","#AFC7D0",
         "#EEF1E6","#FEC9C9","#F9665E",
         "#8DA290","#BEC7B4","#DEE2D9","#FCF1D8","#F2CBBB"
      ];
      
            
      public strongColors : Array<string> = [
         "#003333","#330000","#220000","#110000",
         "#776379","#6B597C","#835B76","#93737D","#6C5F5A",
         "#79485D","#503941","#81814C","#3E4853","#364B65",
         "#637775","#606F6D","#41556C","#404E58","#4C575B",
         "#7F817B","#7C6262","#6C2C29",
         "#58655A","#767C70","#6A6C68","#6A655B","#62524C"
      ];
     
      constructor()
      {
         super();
         this.fixScrollError(); 
         
      } 

      /* PRIVATE FUNCTIONS */

      private fixScrollError()
      {
         window.setInterval(()=>{ 
            const pageXOffset:number = window.pageXOffset;
            const browserError: boolean = pageXOffset !== 0;
            if(browserError)
            {
               console.warn("Erro detectado, corrigindo...");
               this.moveToLeft();
            }
            },this.INTERVAL_LOW_PRIORITY);
      }

      

      public cleanupSession()
      {
            this.store.dispatch("cleanupUserData");
            this.cleanLocalStorage();
            this._api  =  ( null as any) as AxiosInstance;
      }

      private cleanLocalStorage()
      {
         localStorage.removeItem("taulukko_token");
         localStorage.removeItem("autoLogin");
         localStorage.removeItem("debugMode");
         localStorage.removeItem("facebook"); 
      }

      private updateUserData()
      {
        
         const soundMessage:boolean =  this.soundMessage === null ||  this.soundMessage === undefined || this.soundMessage==="true";
         const soundMusic:boolean =  this.soundMusic === null ||  this.soundMusic === undefined || this.soundMusic==="true";
         const soundEffect:boolean =   this.soundEffect  === null ||  this.soundEffect === undefined || this.soundEffect ==="true";
         this.store.commit("changeDeviceSoundMessage",soundMessage );
         this.store.commit("changeDeviceSoundMusic",soundMusic  );
         this.store.commit("changeDeviceSoundEffect",soundEffect);

         if(!this.taulukkoToken)
         {
            return;
         }
         if(this.updateDataInformationSemaphore)
         {
            return;
         }
         this.updateDataInformationSemaphore = true;
         this.api.post('/profile')
         .then(  (response:any) => { 
           
            this.store.dispatch( "updateUserData",response.data);
            this.emitOnLoadUserInformation(response.data);            
         })
         .catch(  (error:Error) => {
            // handle error
            // TODO: deveria dar um aviso no localstorage de erro pro usuario saber que deve tentar se logar de novo depois de uns instantes
            //TODO: para corrigir o erro de token invalido, precisa desligar a linha de cleanupSession pois ela apaga o cenario de erro
            this.cleanupSession();
            console.error("updateUserData: Servidor de backend esta online? Erro desconhecido usando token :" + this.taulukkoToken,error);

         })
         .then(() =>{
            this.updateDataInformationSemaphore = false;
         })
         ;
      }

      /* VARIAVEIS E CONSTANTES COMUNS */

      get api():AxiosInstance
      {
         if(!this._api)
         {
            
            const config  = {baseURL: this.store.getters.backendHostname};
            console.log("registring api ",config);
            this._api = axios.create(config);
         }

         return this._api;
      }
 
      get ACCESS_LEVEL()
      {
         return {
            BANNED: -100,
            INVALID: -50,
            NORMAL: 0,
            GUEST: 50,
            SUBSCRIPER: 100,
            ADMIN: 1000,
         };
      }

      get INTERVAL_LOW_PRIORITY():number
      {
         return 3000;
      }

        get INTERVAL_MID_PRIORITY():number
      {
         return 1000;
      }

      get MAX_GAME_IMG_SIZE_KB():number
      {
         return 200;
      }
 
      get facebookClientId() :  string
      {
         if(process.env.NODE_ENV && 
            process.env.NODE_ENV == "production") 
         {
            return  "186223299284332";
         }
         return "615585672590336"; 
      }

 

      get frontendHostname() : string
      {
         if(process.env.NODE_ENV && 
            process.env.NODE_ENV == "production") 
            {
            return "http://vol2.taulukko.com.br";
            }
            return "http://localhost:8080";

      }  

      

      get taulukkoToken():string
      {
         let ret : string | null  =   localStorage.getItem("taulukko_token");
         ret = (ret==null)?"":ret;
         return ret;
      }

      get autoLogin():boolean
      {
         const autoLogin:string | null =  localStorage.getItem("autoLogin");
         return  autoLogin==="true";
      }

      set soundEffect(value:string)
      {
         localStorage.setItem("soundEffect",value);
      }

      set soundMusic(value:string)
      {
         localStorage.setItem("soundMusic",value);
      }


      set soundMessage(value:string)
      {
         localStorage.setItem("soundMessage",value);
      }

      get soundEffect():string
      {
         return  localStorage.getItem("soundEffect") as string;
      }

      get soundMusic():string
      {
         return  localStorage.getItem("soundMusic") as string;
      }

      
      get soundMessage():string
      {
         return  localStorage.getItem("soundMessage") as string;
      }

      set autoLogin(value:boolean)
      {
         localStorage.setItem("autoLogin",(value)?"true":"false");
      }

      set taulukkoToken(token:string)
      {
         localStorage.setItem("taulukko_token",token);
         if(token)
         {
            this.api.interceptors.request.use(  (config) => {

               //ATENCAO! Só funciona para post, se precisar de parametros tem que ser POST
               if(!config.data)
               { 
                  config.data = {};
               } 
               config.data['tokenuser'] = token; 
               return config;
            },   (error) => {
               return Promise.reject(error);
            }); 
         }
         this.updateUserData();
      }
      
      get debugMode():boolean
      {
         let debugModeStr = String(localStorage.getItem("debugMode"));
         
         debugModeStr=(debugModeStr==="true")?debugModeStr:"false"; 
         return debugModeStr==="true";
      }


      get facebook():string
      {
         return  (localStorage.getItem("facebook") as string);
      }

      set facebook(token:string)
      {
         localStorage.setItem("facebook",token);
      }


      /* EVENTOS COMUNS */
 

      public emitOnLoadUserInformation(userInformation:any)
      {
         this.$emit("onLoadUserInformation",userInformation);
      }

      public onLoadUserInformation(callback:Function)
      {
         this.$on("onLoadUserInformation",callback)
      }

      public newImage():HTMLImageElement
      {
         const ret:HTMLImageElement = new Image();
         ret.crossOrigin="anonymous" ;
         return ret;
      }

      public resizeImg(img:HTMLImageElement, maxWidth:number, maxHeight:number ):string {
         const padding:boolean = true;
      
     
         const imgWidth:number = img.width
         const imgHeight:number = img.height;
     
         const canvas:HTMLCanvasElement = document.createElement("canvas");
         const canvasContext:CanvasRenderingContext2D = (canvas.getContext("2d") as CanvasRenderingContext2D);
     
         canvas.width =  maxWidth;
         canvas.height = maxHeight;
      
        canvasContext.fillStyle = "#000";
        canvasContext.fillRect(0,0,maxWidth,maxHeight);
        
     
       let startX:number = 0 ; 
       let startY:number = 0 ; 
       
       let newWidth:number =maxWidth;
       let newHeight:number = maxHeight;
       
       const paddingW:boolean = (maxWidth/ imgWidth ) > (maxHeight / imgHeight) ;
       const paddingH:boolean = (maxWidth/ imgWidth ) < (maxHeight / imgHeight) ;
       const noPadding:boolean = (maxWidth/ imgWidth ) == (maxHeight / imgHeight) ;
     
       if(paddingW )
       {
           const radio : number =  (maxHeight / imgHeight) ;
           newWidth =  Math.round(radio * imgWidth); 
            startX = Math.round( (maxWidth- newWidth) / 2 ) ;  
       }
       else if (paddingH)
       {
         const radio : number =   (maxWidth/ imgWidth ) ;
         newHeight =  Math.round(radio * imgHeight); 
         startY = Math.round( (maxHeight- newHeight) / 2 ) ; 
         
       }
      
      
        canvasContext.drawImage(img, startX, startY, newWidth, newHeight); 
      
         return canvas.toDataURL();
       }
       
       public img2b64(img:HTMLImageElement, type : string = "image/png", quality:string = "") : string
       {
         const canvas:HTMLCanvasElement = document.createElement('canvas'); 
         const ctx:CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D; 
         ctx.drawImage(img,0,0); 
         return canvas.toDataURL(type, quality); 
       }

      
      public emitOnUpdateLoginStatus(userUpdateInformation:UserStatus)
      {
         this.store.dispatch("changeUserLogged", userUpdateInformation.success);

         if(userUpdateInformation.success)
         {
            this.autoLogin = true;
            if(userUpdateInformation.token)
            {
               this.taulukkoToken = userUpdateInformation.token;
               this.updateUserData();
            }
            else
            {
               this.autoLogin = false;
               console.error(userUpdateInformation,"Não foi logado com sucesso se não tiver um token do taulukko");
               throw new Error("Não foi logado com sucesso se não tiver um token do taulukko");
            }

            if(userUpdateInformation.image )
            {
                  //no caso de sucesso e somente se tiver imagem, ele atualiza a imagem
                  //se não ele mantém a antiga
                  this.store.dispatch("changeUserImage",  userUpdateInformation.image);
            }
            else
            {
               //TODO: //quem le imagem do userupdateinformation poderia ler diretamente do store
               userUpdateInformation.image = this.store.getters.userImage;
            }  
         }
         else
         {
            this.cleanupSession();

         }
         this.$emit("onUpdateLoginStatus",userUpdateInformation);
      }

      public onUpdateLoginStatus(callback:Function)
      {
         this.$on("onUpdateLoginStatus",callback)
      }

      public onAfterValidateTaulukkoToken(callback:Function)
      {
         this.$on("onAfterValidateTaulukkoToken",callback)
      }

      public emitOnAfterValidateTaulukkoToken(success:boolean)
      {
         //every time after invalidate token, must change login status
         if(!success)
         {
            this.autoLogin=false;
         }
         const token : string | null = (success)?this.taulukkoToken:"";
         const image : string | null = (success)?this.store.getters.userImage as string:this.store.state.constants.DEFAULT_IMAGE;
         const dataUpdateLoginStatus:UserStatus = {token,success,image,from:"TaulukkoToken"};
         this.emitOnUpdateLoginStatus(dataUpdateLoginStatus);
         this.store.dispatch("changeUserLogged",success);
      }

      

      public emitOnRequesLoginModal()
      {
         this.$emit("onRequesLoginModal");
      }

      public onRequesLoginModal(callback:Function)
      {
         this.$on("onRequesLoginModal",callback)
      }

      public emitOnRequesRegisterLoginByFacebook()
      {
         this.$emit("onRequesRegisterLoginByFacebook");
      }

      public onRequesRegisterLoginByFacebook(callback:Function)
      {
         this.$on("onRequesRegisterLoginByFacebook",callback)
      }

      public emitOnAfterGoogleLogin(googleUser:any)
      {
         this.$emit("onAfterGoogleLogin",googleUser);
      }

      public onAfterGoogleLogin(callback:Function)
      {
         this.$on("onAfterGoogleLogin",callback)
      }

      //Chamado apenas para validar o token e logar o usuário (varios lugares chamam e um executa)
      public emitOnRequestUpdateUserInfo(taulukoToken:string)
      {
         this.$emit("onRequestUpdateUserInfo",taulukoToken);
      }

      //ouvido por quem executa
      public onRequestUpdateUserInfo(callback:Function)
      {
         this.$on("onRequestUpdateUserInfo",callback)
      }

      public emitOnCreateGAPI(etc:any)
      {
         throw new Error("Only is possible create that event by javascript into index.html file");
      }

      public onCreateGAPI(callback:any)
      {
         window.addEventListener('onCreateGAPI',callback);
      }

      public emitOnDebugModeChange(newStatus:boolean)
      {
         this.$emit("onDebugModeChange",newStatus);
         localStorage.setItem("debugMode",String(newStatus)); 
      }

      public onDebugModeChange(callback:any)
      {
         this.$on('onDebugModeChange',callback);
      }

      public emitOnRouteChange(from:Route,to:Route)
      {
         this.$emit('onRouteChange',{from,to});
      }

      public onRouteChange(callback:(value:any)=>void)
      {
         this.$on('onRouteChange',callback);
      }


      /* FUNCOES COMUNS */
      public needRedirect(routePath:string):boolean
      {
         const found:boolean = this.store.state.application.needRedirectPages.find( (element) => element == routePath)!=undefined;
         return found;
      }


      public moveToLeft()
      {
         //a mudança para hidden e novamente para scroll no overflow é por conta de um bug nos navegadores Android
         //para saber mais sobre o workarround : https://stackoverflow.com/questions/1144805/scroll-to-the-top-of-the-page-using-javascript
         const body = document.getElementsByTagName("body")[0];
         body.style.overflowX = "auto";
         window.scrollTo({ left: 0 });
         body.style.overflowX = "hidden";
      }

      public moveToUP()
      {
         //a mudança para hidden e novamente para scroll no overflow é por conta de um bug nos navegadores Android
         //para saber mais sobre o workarround : https://stackoverflow.com/questions/1144805/scroll-to-the-top-of-the-page-using-javascript
         const body = document.getElementsByTagName("body")[0];
         body.style.overflowY = "hidden";
         window.scrollTo({ top: 0 });
         body.style.overflowY = "auto";
      }

      public logoutFromGoogleAuth()
      {
         const gapi:any= (window as any).gapi;
         const alreadyCreatedGAPI = gapi;
         const wasLoggedByGoogle = alreadyCreatedGAPI && gapi.auth2;
         if(wasLoggedByGoogle)
         {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                  console.info('User signed out from google.');
            }).catch((e:Error)=>{
                  console.warn('Erro ao deslogar pelo Google',e);
            });
         }  
      }

      public logout()
      {
         this.logoutFromGoogleAuth();
         this.autoLogin = false;
         const dataUpdateLoginStatus:UserStatus = 
         {token:"",success:false, image:this.store.state.constants.DEFAULT_IMAGE,from:"Taulukko Logout"};
         this.emitOnUpdateLoginStatus(dataUpdateLoginStatus);
      }

      

      public dateToStringTime(date:Date):string {
         const hour:number  = date.getHours();
         const hourF:string = (hour < 10) ? '0'+hour :   hour.toString();
         const minute:number  =  date.getMinutes();
         const minuteF:string = (minute < 10) ? '0'+minute : minute.toString();
         return hourF + ":" + minuteF;
     }

     public dateToStringDateTime(date:Date):string{
      const dia:string  = date.getDate().toString();
      const diaF:string = (dia.length == 1) ? '0'+dia : dia;
      const mes:string  = (date.getMonth()+1).toString(); //+1 pois no getMonth Janeiro começa com zero.
      const mesF:string = (mes.length == 1) ? '0'+mes : mes;
      const anoF:number = date.getFullYear();
         return diaF+"/"+mesF+"/"+anoF + " " + this.dateToStringTime(date); 
     } 

     public executeAfterVueJS(func:()=>void):()=>void{
      //settimeout executa após a main thread estar vazia
      //para garantir que todo o ciclo de vida do vuejs tenha sido executado
      //para mais informações leia : https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Asynchronous/Timeouts_and_intervals
      return ()=>{window.setTimeout(func,1);};      
     } 


     isMobile() :boolean { 
      if( navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
      ){ 
         return true;
      }
      else { 
         return false;
      }
   } 
  }
  
  
  export default new BusVue();
 