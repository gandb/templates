<template>
  <DIV>Página de administração</DIV>
</template>


<style scoped  lang="scss"> 
</style>

<script lang="ts">
	import {  Component, Vue } from 'vue-property-decorator';
  import bus from "@/bus";
  
  @Component({name: 'Admin', 
		components: {
		}
	  } )
    export default class Admin extends Vue { 
 
     
    mounted()
    {
      
       bus.store = this.$store;
    } 
  }
</script>

<style scoped>
</style>