<template>
  <div class="about">
    <h1>This is an about page  </h1> 
  </div>
</template>

<script lang="ts">
	import {  Component, Vue } from 'vue-property-decorator';
import HeaderMenu from '@/components/HeaderMenu.vue'
   import bus from "@/bus";
   @Component({name: 'About', 
		components: {
			HeaderMenu
		}
	  } )
    export default class About extends Vue { 
    mounted()
    {
            
       bus.store = this.$store;
    }
  }
</script>