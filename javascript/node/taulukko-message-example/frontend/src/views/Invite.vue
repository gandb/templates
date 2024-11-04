<template>
  <div class="t-segment t-invite">
    <div v-if="logged">
       <P v-if="message!=''">{{message}}</P> 
    </div>
    <div v-else>
      <P>Você está deslogado, para aceitar o convite é necessário primeiro entrar no Taulukko.</P>
    </div>
  </div>
</template>

<style scoped  lang="scss">
  .t-invite
  {
    padding:var(--lv2-margin);
  }
</style>

<script lang="ts">
    import { Component, Vue,Prop,Watch } from 'vue-property-decorator';  
    
    import bus from "@/bus"; 
    import UserStatus from "@/UserStatus";
 
 
   @Component({name: 'Invite', 
		components: { 
		}
	  } )
    export default class Invite extends Vue { 

      cmpid:string = "";
      invite:string = "";
      logged:boolean = false;
      message="";

      url:string = "";

      mounted()
      {

       bus.store = this.$store;
        this.cmpid = this.$route.params.cmpid;
        this.invite = this.$route.params.invite;

        this.logged = this.$store.state.user.logged;

        console.log("mounted:100");

         this.loadInvite();


        bus.onUpdateLoginStatus((data:UserStatus)=>{ 
                this.logged =  data.success;

                 console.log("AonUpdateLoginStatus:50");

                this.loadInvite();
              
        });
      }

      loadInvite()
      {

        if(!this.logged)
        {
          return;
        }

        this.url = this.$store.getters.backendHostname + "/campaign/" + this.cmpid + "/invitation/" + this.invite ;
 
      }
    }
    
</script>