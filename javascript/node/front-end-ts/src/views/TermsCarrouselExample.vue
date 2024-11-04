<template>
  <div class="terms">
 
  <carroussel :slides="slides">
      <template slot="content1">
        <img src="https://s.ftcdn.net/v2013/pics/all/curated/RKyaEDwp8J7JKeZWQPuOVWvkUjGQfpCx_cover_580.jpg?r=1a0fc22192d0c808b8bb2b9bcfbf4a45b1793687">
      </template> 

      <template slot="content2">
        <img src="https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80">
      </template> 

      <template slot="content3">
        <img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80">
      </template> 

      <template slot="content4">
        <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg">
      </template> 

      <template slot="content5">
        <div style="margin-left:100px">
          <H1>Teste</H1>
          <P>Isso é um teste</P>
        </div>
      </template> 
 

  </carroussel>
  </div>
</template>

<script lang="ts">
	import {  Component, Vue } from 'vue-property-decorator';
import Carroussel from '@/components/Carroussel.vue'
   import bus from "@/bus";
   @Component({name: 'Terms', 
		components: {
			Carroussel
		}
	  } )
    export default class Terms extends Vue { 
 
      slides:any = [
          {
              title: "Titulo 1"
          },
          {
              title: "Titulo 2"
          }
          ,
          {
             
          }     ,
          {
              title: "Titulo 4"
          }    ,
          {
              title: "Titulo 5",
              titleColor:"black"
          }
          ] ;
 
    mounted()
    {
      
       bus.store = this.$store;
    } 
  }
</script>

<style scoped>
</style>