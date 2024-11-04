<template>
    <div class="t-content">
      <button @click="switchMode" >Trocar</button>
      <transition name="trans-profile">
        <div v-if="profileMode===0" class="t-profile-main">
            Tela de profile
        </div>
      </transition>
      <transition name="trans-add-campaign"
      v-on:before-enter="beforeEnterAddCampaign"
      v-on:before-leave="beforeLeaveAddCampaign">
          <div v-if="profileMode===1" class="t-add-campaign">
            Tela de Adição de Jogo
        </div>
        </transition>
      <transition  
      v-on:before-enter="beforeEnterAddCampaign"
      v-on:before-leave="beforeLeaveAddCampaign"
      enter-active-class="tipo1"
      leave-active-class="tipo1"
      enter-to-class="tipo2"
      leave-to-class="tipo2"
      >
          <div v-if="profileMode===2" class="t-edit-campaign">
            Tela de Edicao de Jogo
        </div>
        </transition> 

              <transition  
      enter-active-class="tipo1"
      leave-active-class="tipo1"
      enter-to-class="tipo2"
      leave-to-class="tipo2"
      >
          <div v-if="profileMode===3" class="t-remove-campaign">
            Tela de Remocao de Jogo
        </div>
        </transition> 
    </div>
    
</template>

<script lang="ts">
  import { Component, Vue,Prop } from 'vue-property-decorator'; 
  import bus from "@/bus"; 

@Component({
  name: 'TransitionSB', 
  components: {  
  }
} )
export default class TransitionSB extends Vue {

  profileMode:number = 0;
     
     mounted(){

       bus.store = this.$store;
     }
     
    beforeEnterAddCampaign()
    {
      console.log("enter campaign");
    }
    beforeLeaveAddCampaign()
    {
      console.log("leave campaign");
    }
      
    switchMode()
    {
        console.log("switch");
        this.profileMode++ ;
        if(this.profileMode>3)
        {
          this.profileMode=0;
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">  
  
    /** Inicio das transicoes */
    .trans-profile-enter-active, .trans-profile-leave-active {
      transition: opacity .5s;
    }
    .trans-profile-enter, .trans-profile-leave-to /* .fade-leave-active em versões anteriores a 2.1.8 */ {
      opacity: 0;
    }

    .trans-add-campaign-enter-active, .trans-add-campaign-leave-active {
      transition: opacity .5s;
    }
    .trans-add-campaign-enter, .trans-add-campaign-leave-to /* .fade-leave-active em versões anteriores a 2.1.8 */ {
      opacity: 0;
    }

    .tipo1{
      transition: opacity .5s;
    }
    .tipo2{
      opacity: 0;
    }
    /** Fim das transicoes */

  .t-content
  {
    margin: 10px;
    margin-left: 20px;
  }
</style>
