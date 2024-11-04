<template>
  <div>{{content}}</div>
</template>

<script lang="ts">
import { Component, Prop, Vue,Watch } from 'vue-property-decorator';  
  
@Component({
  name: 'Out', 
  components: { 
  }
} )
export default class Out extends Vue {
   @Prop(  {required: true, type : String} ) content !: string ;
      
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 
</style>
