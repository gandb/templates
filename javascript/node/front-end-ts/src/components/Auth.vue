<template>
    <span></span>
</template>

<script lang="ts">
  import { Component, Prop, Vue,Watch } from 'vue-property-decorator'; 
  import bus from "@/bus"; 
  import UserStatus from "@/UserStatus";
 

  @Component({
    name: 'Auth', 
    components: {
      
    }
  } )
  export default class Auth extends Vue {
    debug: boolean = true; 
   
      mounted()
      { 
         bus.store = this.$store;
          bus.onUpdateLoginStatus((data:any)=>{
              bus.taulukkoToken = data.token;
              this.$store.dispatch("changeUserLogged",data.success);

              if(bus.needRedirect(this.routePath()))
              {
                //redireciona para o login
                 this.$router.push('/');
              }
          }); 
          

          bus.onRequesRegisterLoginByFacebook(()=>{

          

            const facebook: string | null = bus.facebook;

            if(!facebook)
            {
              return;
            } 
           bus.facebook = "";
 
           const pairs = JSON.parse(facebook);
            
            const getFaceInfoURL : string = `/backend/getFaceInfo/${pairs.private}`;

            bus.api.get(getFaceInfoURL)
            .then(  (response:any) => {
                const data =  response.data;
                const dataUpdateLoginStatus:UserStatus = 
                {token:data.token,image:data.image,success:true,from:"Facebook"};
                bus.emitOnUpdateLoginStatus(dataUpdateLoginStatus);
              })
              .catch(  (error:any) => {
                // handle error
                console.error("registerLoginByFacebook error",error); 
                throw error;

              })
              .then(  () => {
                // always executed
              });

         });

         bus.onAfterGoogleLogin((googleUser:any) => { 
 
                if(!bus.autoLogin)
                {
                  //unnable to auto-login 
                  return;
                }

                const id_token = googleUser.getAuthResponse().id_token;  
                bus.api.post('/backend/checkGoogleToken' ,{id_token} )
                    .then(  (response:any) => {
                        const data:UserStatus = {
                          token:response.data.token,
                          image:response.data.image,
                          success:true,
                          from:"Google"};
                        bus.emitOnUpdateLoginStatus(data); 
                        bus.logoutFromGoogleAuth();
                      })
                      .catch(  (error:any) => {
                        // handle error
                        bus.autoLogin=false;
                        console.error("checkGoogleToken error, maybe backend server is offline " + id_token,error);
                        const data:UserStatus = 
                        {token:"",success:false, image:this.$store.state.constants.DEFAULT_IMAGE,from:"Google"};
                        bus.emitOnUpdateLoginStatus(data);

                      });
                }

               );

        bus.onRequestUpdateUserInfo((tokenUser:string)=>
        {
          if(!tokenUser)
          {
            throw new Error("Token empty");
          }

          bus.taulukkoToken = tokenUser;
           
          bus.api.post('/profile' )
            .then(  (response:any) => {
                this.$store.dispatch("changeUserImage", response.data.image);
                bus.emitOnAfterValidateTaulukkoToken(true); 
              })
              .catch(  (error:Error) => {
                // handle error
                let response:Response=(error as any).response;
                if(response!= undefined && response.status!=undefined && response.status ===401)
                {
                  bus.emitOnAfterValidateTaulukkoToken(false); 
                  
                  return;
                }
                console.error("Servidor de backend esta online? Erro desconhecido usando token :" + tokenUser,error);
                

              });
        } );

        //deve vir por último, para que o emitOnRequestUpdateUserInfo esteja devidamente registrado
        const sessionToken : string = bus.taulukkoToken;
        const previousLoggin : boolean =  sessionToken!="";

        if(previousLoggin)
        {
          bus.emitOnRequestUpdateUserInfo(sessionToken);
        } 
      
      } 

      routePath() : string {
           return (this.$route.fullPath)?this.$route.fullPath:"";
      }
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 
</style>
