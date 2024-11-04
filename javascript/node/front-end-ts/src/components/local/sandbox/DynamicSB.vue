<template>
    <div class="t-content">
       <H2>DynamicSB</H2>
       <P>Para criar componentes dinamicos, pode-se fazer um chamado ComponentGeneric para cada campo criado pelo usuário.
         Este componente genérico recebe as informações do banco. 
         Com estas informações ele decide pelo campo TYPE qual componente ele vai mostrar e repassa as demais informações como 
         WIDTH, HEIGHT, LEFT, TOP, etc pro componente que será instanciado.
       </P>
    </div>
    
</template>

<script lang="ts">
  import { Component, Vue,Prop } from 'vue-property-decorator'; 
  import bus from "@/bus"; 

@Component({
  name: 'DynamicSB', 
  components: {  
  }
} )
export default class DynamicSB extends Vue {

  profileMode:number = 0;
     
     mounted(){

       bus.store = this.$store;
     }
      

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">  
  .t-content 
  {
    color:white;
  }
   
</style>
