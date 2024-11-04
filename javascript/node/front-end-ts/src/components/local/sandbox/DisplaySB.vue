<template>
    <div class="t-content">
      <div class="head">
          <H1>DisplaySB</H1>
      </div>
      <div class="left"  >
        
        <div class="displays">
          <Display7 :fontSize="58" bgcolor="black" value="1"></Display7>
          <Display7 :fontSize="58" bgcolor="black" value="0"></Display7>
          <Display7 :fontSize="58" bgcolor="black" value=":"></Display7>
          <Display7 :fontSize="58" bgcolor="black" value="0"></Display7>
          <Display7 :fontSize="58" bgcolor="black" value="3"></Display7>
          <BR/>
        </div>
        <div class="tags">
          <Tag :fontSize="58" value="TESTE"></Tag>
          <Tag :fontSize="58" bgcolor="black" value="teste"></Tag>
        </div>
        <div class='leds'>
         
          <div>
            <Led color="green" :size="24"/>
            <Led color="red" :size="36"/>
            <Led color="blue" :size="48"/>
            <Led color="yellow" :size="64"/>
            <Led color="orange" :size="72"/>
          </div>
         
          <div>
            <Led color="green" :blink="false" :size="24"/>
            <Led color="red"  :blink="false" :size="24"/>
            <Led color="blue"  :blink="false" :size="24"/>
            <Led color="yellow"  :blink="false" :size="24"/>
            <Led color="orange"  :blink="false" :size="24"/>
          </div>
          
          <div>
            <Led color="green" :blink="false" :on="false" :size="24"/>
            <Led color="red"  :blink="false" :on="false" :size="24"/>
            <Led color="blue"  :blink="false" :on="false" :size="24"/>
            <Led color="yellow"  :blink="false" :on="false" :size="24"/>
            <Led color="orange"  :blink="false" :on="false" :size="24"/>
          </div>
        </div>
        
      </div>
    

      <div class="center"  > 
         <AMPM color="red" :size="24" :hour="12"/>
         <AMPM color="red" :size="16" :hour="16"/>
      </div>
      <div class="right"  ></div>
      <div class="tail"  ><TimeDisplay label="DESTINATION TIME" :date="date1"/></div>
      
    </div>
    
</template>

<script lang="ts">
  import { Component, Vue,Prop } from 'vue-property-decorator'; 
  import bus from "@/bus";    
  import {default as Display7} from "@/components/alarm/Display7.vue";
  import {default as Tag} from "@/components/alarm/Tag.vue";
  import {default as Led} from "@/components/alarm/Led.vue";
  import {default as AMPM} from "@/components/alarm/AMPM.vue";
  import {default as TimeDisplay} from "@/components/alarm/TimeDisplay.vue";


@Component({
  name: 'DisplaySB', 
  components: {  
    Display7,Tag,Led,AMPM,TimeDisplay
  }
} )
export default class DisplaySB extends Vue {

  profileMode:number = 0;
  client:any;
  socket:any;
  date1:Date = new Date(2020,11,13,17,34);
     
     mounted(){

       bus.store = this.$store;


     }
 

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">  
  .t-content 
  {
    color:white;
    margin-left:20px;
     display: grid;
    grid-template-columns: 1fr 1fr 1fr ;
    grid-template-rows: 3fr;
    gap: 0px 0px;
    grid-template-areas:
      "head head head"
      "left center right"
      "tail tail tail";

     DIV
     {
       background-color: transparent;
     } 

    .head{
       grid-area: head;
    }  
    
    .tail{
       grid-area: tail;
    }  
    
    .left{
       grid-area: left;
    }  
    
    .right{
       grid-area: right;
    }  

    
    .center{
       grid-area: center;
    }  

    .t-actions BUTTON{
      display: inline;
    }

     .displays{
       background-color: black;
       width: fit-content;
       padding-left: 10px;
       padding-right: 10px;
     }  
    .displays > *
    {
      display: inline-block;
    } 

    .leds>DIV
    {
      display: inline-block;
      width:100%;
      margin-top:1em;
    }
    
  }
  
</style>
