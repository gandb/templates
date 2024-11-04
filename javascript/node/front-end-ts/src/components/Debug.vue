<template>
    <div class="t-debug" v-if="debug"> 
      <span>Debug Tools : </span>
      <button v-if="!logged" @click="loginFake">Logar</button>
      <button @click="printToken">Token</button>
      <button @click="printState">State</button>
      <button @click="switchSandboxMode">Switch Sandbox Mode</button>
      <BR/>
      <button @click="loadGameFromDatabase">Load Game DB</button>
      <button @click="configGame">Config Game</button>  
      <button @click="onClose">Close</button>
      <span v-if="$store.state.game">Game loaded : {{$store.state.game.cmpid}}</span>
    </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue,Watch } from 'vue-property-decorator'; 
  import bus from "@/bus";  
  import UserStatus from "@/UserStatus";
  
  @Component({
    name: 'Debug', 
    components: {
      
    }
  } )
  export default class Auth extends Vue {
    debug: boolean = true;
    logged:boolean = false; 
    
    mounted(){
       bus.store = this.$store;
    }

    configGame(){
       const url = "campaign/debug/configGame";
        bus.api.post(url)
          .then(  (response:any) => {
                console.log("Configurado!!!");
             })
          .catch(  (error:Error) => { 
            console.error("configGame error",error); 
            throw error;

          });
    }

    loginFake()
    {
      const data = {token:"teste",success:true, image:this.$store.state.constants.DEFAULT_IMAGE, from: "LoginFake"};
      bus.emitOnUpdateLoginStatus(data);

    }
    printToken()
    {
      console.log("bus.taulukkoToken:",bus.taulukkoToken);
    } 

    switchSandboxMode()
    {
      this.$store.dispatch("changeSandboxActive", !this.$store.state.sandbox.active);
    }


    printState()
    {
      console.log(this.$store.state);
    }

    onClose()
    {
      this.debug=false;
    }

    loadGameFromDatabase()
    {
      this.$router.push("/game/10462022688--60f83800-b96f068f-aece-4bbf-8b39-8529f65");
    } 
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">  
 #outergame ,  #innergame 
 {
  .t-debug
  {
    margin-top: 5px;
    margin-left: 5px;
  }
  .t-debug button
  {
      margin-left: var(--lv1-margin,10px); 
      cursor:pointer;
      display: inline;
      font-size: var(--lv1-font-size,10px); 
      padding: var(--lv1-margin,10px); 
  }

   .t-debug button:hover
  {
      background-color: black;
  }
 }

</style>
