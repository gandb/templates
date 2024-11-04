<template>
  <div class="t-terms t-segment">
    <h1>Você foi removido da campanha!</h1>

    <P>O seu mestre o removeu da campanha, tente conversar com ele e entender o motivo que isto ocorreu.</P>

    <P>Talvez seja possível voltar para o jogo conversando com ele, para isto ele terá que gerar um novo link de acesso pois o antigo foi revogado.</P>
 
  </div>
</template>


<style scoped  lang="scss">
  .t-terms
  {
    padding:var(--lv2-margin);
  }
</style>

<script lang="ts">
	import {  Component, Vue } from 'vue-property-decorator'; 
   import bus from "@/bus";
   @Component({name: 'Terms', 
		components: { 
		}
	  } )
    export default class Terms extends Vue {  
   
 
    mounted()
    {
      
       bus.store = this.$store;
    } 
  }
</script>

<style scoped>
</style>