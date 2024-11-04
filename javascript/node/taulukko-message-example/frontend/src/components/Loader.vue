<template>
  <div  v-if="lock" class="st-lock">
    <modal :open="lock"   
      width="720px"
      height="400px"
      title="Processando...">
          <div class="t-signin" slot="content"> 
            <div class="ui active loader"></div>
            <slot></slot>
        </div>
    </modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue,Watch } from 'vue-property-decorator';  
import Modal from '@/components/Modal.vue';

@Component({
  name: 'Loader', 
  components: { 
    Modal
  }
} )
export default class Loader extends Vue {
   @Prop(  {required: true, type : Boolean} ) lock !: boolean ;
      
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  

</style>
