<template>
  <div class="t-wrapper">
    <transition name="trans-modal">
      <div  @click.stop="onBackgroundClick" v-if="open" class="t-modal">
        
          <div @click.stop v-if="open"  class="t-modal-intern" >
            <div class="t-modal-wrapper-content" :style="style()">
                <DIV :v-if="title!==''" class="t-modal-before-header">
                    <img @click="onDiceClick" src="@/assets/images/v-32x32.png" class="t-dice">
                    <label>{{title}} </label>
                </DIV>

                <div class="t-modal-header">
                  <slot name="header"></slot>
                </div>

                <div class="t-modal-content">
                  <slot name="content"></slot>
                </div>
                <div class="t-modal-footer">
                  <slot name="footer"></slot>
                </div>
            </div>
          </div>
      
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue,Watch } from 'vue-property-decorator';  
  
@Component({
  name: 'Modal', 
  components: { 
  }
} )
export default class Modal extends Vue {
   @Prop(  {required: false, type : String, default:""} ) title !: string ;
   @Prop(  {required: false, type : Boolean, default:true} ) open !: boolean ;
   @Prop(  {required: false, type : String, default:"auto"} ) width !: string ;
   @Prop(  {required: false, type : String, default:"auto"} ) height !: string ;

    onBackgroundClick(e:Event)
    {
         this.$emit("onBackgroundClick",e);
    }

    onDiceClick(e:Event)
    {
      this.$emit("onDiceClick",e);
    }

    style():string
    {
      return `height:${this.height};width:${this.width}`;
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  /** Inicio das transicoes */
  @keyframes slide-in {
    from {transform:  translateY(100px)};
    to {transform:  translateY(0px)};

  }

  @keyframes slide-out {
    from {transform:  translateY(0px)};
    to {transform:  translateY(100px)};

  }

  .trans-modal-enter-active, .trans-modal-leave-active {
    transition: opacity .5s;
    .t-modal-intern
    {
        animation: slide-in 0.5s ease;
    }
  }
  .trans-modal-enter, .trans-modal-leave-to {
    opacity: 0; 
    .t-modal-intern
    {
        animation: slide-out 0.5s ease;
    }
  }

  /** Fim das transicoes */
  .t-wrapper
  {
    position: absolute; 
  }

  .t-modal
  {
    position:fixed;
    top:0px;
    left:0px;
    z-index: var(--zmodal-lv0, 1000000000);
    background : var(--black-half-transparent,rgba(0,0,0,0.9));
    width: 100%;
    height:100%;
    
  }

  .t-modal div
  {
    font-size: var(--lv4-font-size,24px);
    line-height:var(--lv4-font-size,24px);
  }

  .st-mobile .t-modal div
  {
    font-size: var(---lv4-mobile-font-size,72px);
    line-height:var(---lv4-mobile-font-size,72px);
  }
  
  .st-mobile .t-modal
  {
    width: 150%;
    height:150%;
  }

  .t-modal-intern
  { 
    position: relative;
    display: flex;
    overflow-y: auto; 
    width: fit-content;
    background :var(--half-white,rba(253,253,253));
    padding:var(--lv3-margin,40px);
    margin-left:auto;
    margin-right:auto;
    margin-top:5%;
    border-radius:var(--half-border-radius,15px);
  } 

  .st-mobile .t-modal-intern
  { 
    margin-left:20%;
    margin-right:20%;
    margin-top:25%;
  }

  .t-modal-before-header 
  {
    margin-top: var(--lv2-negative-margin,-20px); 
    height: 100px;
  }

  .st-mobile .t-modal-before-header 
  { 
    top: var(--lv4-negative-margin,-80);  
  }

  #outergame .t-modal-before-header label
  {
    color:var(--taulukko-orange,orange);
    font-size: 36px;
    font-weight: 900;
    padding-left:var(--lv1-margin,10);
    
  }
 
  .t-modal-before-header img
  {
    vertical-align: sub; 
  }

  .st-mobile .t-modal-before-header label {
    font-size: var(---lv4-mobile-font-size,72px);
    top: var(--lv4-negative-margin,-80);
  }
  
  .st-mobile .t-modal-before-header img {
     width: 64px;
    height: 64px;
  }
</style>
