<template>
    <div>
        
        <H1>teste1</H1>
         <button @click="testar">teste</button>
           <transition 
            v-on:before-enter="beforeEnter"
            v-on:before-leave="beforeLeave">
          <P v-if="teste">Teste2</P>
            </transition>
          <P v-if="!teste">Teste3</P>
         
      </div>
    </div>
</template>

<script lang="ts">
  import { Component, Vue,Prop } from 'vue-property-decorator'; 
  import bus from "@/bus"; 

@Component({
  name: 'HomeSB', 
  components: {  
  }
} )
export default class HomeSB extends Vue {
        teste:boolean=false;

      mounted(){

        bus.store = this.$store;
      }

      testar()
      {
        this.teste=!this.teste;
      }


      beforeEnter()
      {
        console.log("beforeEnter");
      }

      enter(el:any, done:any) {
      
        console.log("enter");
        done();
      }
 
  beforeLeave()
      {
        console.log("beforeLeave");
      }
 
      
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">   
</style>
