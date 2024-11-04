<template>
    <div class="t-content">
        <H1>Teste 1
          <div class="sub">Teste 1</div>
        </H1>
        <H2>Teste 2
          <div class="sub">Teste 2</div>
        </H2>
        <H3>Teste 3
          <div class="sub">Teste 3</div>
        </H3>
        <H4>Teste 4
          <div class="sub">Teste 4</div>
        </H4>
        <H5>Teste 5
          <div class="sub">Teste 5</div>
        </H5>
        <H6>Teste 6
          <div class="sub">Teste 6</div>
        </H6>
        <P>Parágrafo comum.</P>
    </div>
</template>

<script lang="ts">
  import { Component, Vue,Prop } from 'vue-property-decorator'; 
  import bus from "@/bus"; 

@Component({
  name: 'Headers', 
  components: {  
  }
} )
export default class Headers extends Vue {
     mounted(){
       bus.store = this.$store;
     }
      
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">  
 @import "@/assets/css/headers"; 
 
    /* all commons into common.css*/  
  .t-content
  {
    margin: 10px;
    margin-left: 20px;
  }
</style>
