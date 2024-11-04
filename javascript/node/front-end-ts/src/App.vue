<template>

  <div id="app">
      <debug/> 
      <div v-if="calcHasGame()" id="innergame">
         <div v-if="!calcHasSandbox()">        
              <router-view  />
        </div>
      </div>
      <div v-else id="outergame">
        <div v-if="calcHasSandbox()">
              <sandbox-page/>
        </div>
        <div v-else>              
              <common-page/>
        </div>
      </div>
  </div>
</template> 

<script lang="ts">
    import { Component, Vue,Prop } from 'vue-property-decorator';
    import CommonPage from '@/components/local/CommonPage.vue' ;
    import SandboxPage from '@/components/local/SandboxPage.vue' ;    
    import Debug from '@/components/Debug.vue';
    import bus from "@/bus";
    import {StateVuexTaulukko} from '@/store/types';

    
  
    @Component({name: 'App', 
      components: {
        CommonPage,Debug,SandboxPage
      }
    } )
    
  export default class App extends Vue {  


      mounted()
      {
         bus.store = this.$store;
        
         window.onbeforeunload = (e:Event)=>this.handlerClose(e);

        this.$store.dispatch("changeDeviceMobile",bus.isMobile());   

        bus.onRouteChange((route)=>{ 
          if(route.to.name != "Game")
          {
            console.log("Detectado fora do jogo", route.to.name);
          } 
        });
 
      }

      handlerClose(e:any) {
        const state:StateVuexTaulukko = this.$store.state;
        if(state.application.confirmationOnExit)
        {
          const message = "Ao sair você perderá as informações não salvas, deseja continuar?";
          e = e || window.event;
          // For IE and Firefox 
          if (e) {
            e.returnValue = message;
          }
          // For Safari
          return message;
        }
        console.log("nao deveria ter mensagem");
        return;
      }

      calcHasGame():boolean{
        return this.$store.getters.applicationStateGame >= 0 ;
      }

      calcHasSandbox():boolean
      {
        return this.$store.state.sandbox.active;
      }

  }
    
</script>

<style scoped lang="scss">  
  
    /* all commons into common.css*/

</style>
 