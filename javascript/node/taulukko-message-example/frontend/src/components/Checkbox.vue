<template>
   <div @click="onClick"  class="t-checkbox"> 
        <input ref="chk"  type="checkbox" :name="name" class="regular-checkbox" />
        <label :for="name"></label>
       <slot> Insira seu texto no slot</slot>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue,Watch } from 'vue-property-decorator';  
  
@Component({
  name: 'Checkbox', 
  components: { 
  }
} )
export default class Checkbox extends Vue {
   @Prop(  {required: true, type : String} ) name !: string ;  
   @Prop(  {required: false, type : String} ) value !: string ; 
   
   notChecked:string="false";

  mounted()
  {
      const chk : HTMLInputElement = this.$refs.chk as HTMLInputElement;

      console.log("Valor inicial", this.name, this.value );
 
      chk.checked = this.value==="true";
 
  }

 
   onClick()
   {  
     const chk : HTMLInputElement = this.$refs.chk as HTMLInputElement;

     
     if( chk.checked )
     { 
        this.$emit("input", "false"); 
       
        
     }
     else
     { 
         this.$emit("input", "true"); 
          
     }  
     
   }

   @Watch("value")
   onChangeValue(after:string,before:string)
   {
       const chk : HTMLInputElement = this.$refs.chk as HTMLInputElement;

       chk.checked  = after==="true";
   }
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">  

 
  
   #outergame , #innergame
  {
  
    .st-mobile{
        .t-body .t-checkbox 
        {
          font-size:52px;
          line-height: 60px;
            
        } 

        .t-body .regular-checkbox + label {
          width:50px;
          height: 50px;
          top:5px;
        }

        .t-body .regular-checkbox:checked + label:after {
          font-size: 44px;
          top: -10px;
          left: 10px;
          
        }
    }
    .t-checkbox *
    { 
      display: inline;
    }
     .t-checkbox label
    {
      padding-left:10px;
      
    }
     
     .t-checkbox 
    {
        font-weight:initial; 
        line-height: 25px;
        color:#333;
    } 

    .regular-checkbox {
      display: none;
    }

    .regular-checkbox + label {
      background-color: #fafafa;
      border: 1px solid #cacece;
      box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px -15px 10px -12px rgba(0,0,0,0.05);
      border-radius: 5px;
      display: inline-block;
      position: relative;
      width:25px;
      height: 25px;
      top:5px;
    }

    .regular-checkbox + label:active, .regular-checkbox:checked + label:active {
      box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px 1px 3px rgba(0,0,0,0.1);
    }

    .regular-checkbox:checked + label {
      background-color: #e9ecee;
      border: 1px solid #adb8c0;
      box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px -15px 10px -12px rgba(0,0,0,0.05), inset 15px 10px -12px rgba(255,255,255,0.1);
      color: #99a1a7;
      
    }

      .regular-checkbox:checked + label:after {
      content: '\2714';
      font-size: 18px;
      position: absolute;
      top: 0px;
      left: 5px;
      color:green;
    }

  }
    
</style>
