<template>
   <div class="t-button"> 
      <img :title="alt" :alt="alt" class="ui tiny circular image t-round-button" @click="onClick"  :src="buildSource()">
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue,Watch } from 'vue-property-decorator';  
  
@Component({
  name: 'RoundButton', 
  components: { 
  }
} )
export default class RoundButton extends Vue {
    /** Pode ser externo ou i:/ que começará a partir de @/assets/images */
     @Prop(  { required: true, type: String }) source!:string ; 
    @Prop( { required: false , type: String}) alt!:string ;  
     
    onClick()
    {
       this.$emit('click');
    }

    buildSource():string
    {
        /** ATENCAO POR ERRO DO VUE, NAO SE PODE INICIAR DIRETAMENTE DA RAIZ, PRECISA INICIAR DE UMA PASTA ENTAO ESCOLHI IMAGES */
        if(this.source.indexOf("i:/")==0)
        {
          const src = this.source.substring(3);
          return require(`@/assets/images/${src}`);
        }
        else
        {
          return this.source;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped> 
       
  #outergame .t-button
  {
      background-color: transparent;
  }

  @keyframes onHover {
    from {
       transform: rotate(0deg);
    }
    to {
       transform: rotate(360deg);
    }
  } 

  .t-round-button
  { 
    cursor:pointer;
  }
  .t-round-button:hover
  {
    animation-name: onHover;
    animation-duration: 1s;
  }

  .t-round-button:active { 
    transform: translateY(4px);
  }
</style>
