<template>
  <div v-if="content!==''" :class="calcClasses()" class="t-segment t-message">
    <i @click="onClose" class="close icon"></i>
    <div v-if="header!==''" class="header">
      <H2>{{header}}</h2>
    </div>
    <p>{{content}}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue,Watch } from 'vue-property-decorator';  
  
@Component({
  name: 'Message', 
  components: { 
  }
} )
export default class Message extends Vue {
   @Prop(  {required: false, type : String, default:""} ) content !: string ;
   @Prop(  {required: false, type : String, default: ""} ) header !: string ;
   @Prop(  {required: false, type : String, default: "error"} ) type !: string ;
      
    onClose()
    {
       this.$emit("onClose");
    }  

    calcClasses():string
    {
        if(this.type==="error")
        {
          return "t-negative";
        }

        return "t-positive";
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.t-segment.t-message
{
   position: relative;
   padding-top:var(--lv2-margin);
   padding-bottom:var(--lv3-margin);
   height: auto;
   margin-top:var(--lv2-margin);
   margin-bottom:var(--lv2-margin);
}

#outergame .t-message p
 {
   font-size: var(--lv2-font-size);
   font-weight:500;
 }
  #outergame .st-mobile .t-message p
 {
   font-size: var(--lv2-mobile-font-size);
 }

 #outergame .t-message i{
   position: absolute;
   right:var(--lv2-margin);
   top:var(--lv2-margin);
   cursor: pointer;
 }
</style>
