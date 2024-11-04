<template>
<div>
    <div class="actions">
        <Button @click="onRemove">Tela de Remove Player</Button>
        <Button @click="onPortrait">Tela de Portrait</Button>
    </div>
    <BR/>
    <div class="output">
        <label v-if="$store.state.game.subscreen==0">Sem tela</label>
        <label v-if="$store.state.game.subscreen==1">Tela de Remover</label>
        <label v-if="$store.state.game.subscreen==2">Tela de Retrato</label>
    </div>
  </div>    
</template>

<script lang="ts">
  import { Component, Vue,Prop } from 'vue-property-decorator'; 
  import bus from "@/bus"; 

@Component({
  name: 'SubscreenTestSB', 
  components: {  
  }
} )
export default class SubscreenTestSB extends Vue {
     mounted(){

       bus.store = this.$store;
       console.log("game",(this.$store as any).game);
     }

      onRemove()
      {
        console.log("onRemove");
        this.$store.state.game.subscreen = 1;
      }
     
      onPortrait()
      {
        console.log("Portrait");
        this.$store.state.game.subscreen = 2  ;
      }

      
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">  
   
</style>
