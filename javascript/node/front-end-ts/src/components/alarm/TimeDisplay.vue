<template>
  <div class="container-main-time-display">
    <div class="container-time-display">
      <DisplayLabeled class="display-month" name="Month">
          <Display7 :fontSize="72" bgcolor="black" :color="colorDisplay" :value="month1"></Display7>
          <Display7 :fontSize="72" bgcolor="black" :color="colorDisplay" :value="month2"></Display7>
          <Display7 :fontSize="72" bgcolor="black" :color="colorDisplay" :value="month3"></Display7>
      </DisplayLabeled>
      <DisplayLabeled class="display-day" name="Day">
          <Display7 :fontSize="72" bgcolor="black" :color="colorDisplay" :value="day1"></Display7>
          <Display7 :fontSize="72" bgcolor="black" :color="colorDisplay" :value="day2"></Display7>
      </DisplayLabeled>
      <DisplayLabeled class="display-year" name="Year">
          <Display7 :fontSize="72" bgcolor="black" :color="colorDisplay" :value="year1"></Display7>
          <Display7 :fontSize="72" bgcolor="black" :color="colorDisplay" :value="year2"></Display7>
          <Display7 :fontSize="72" bgcolor="black" :color="colorDisplay" :value="year3"></Display7>
          <Display7 :fontSize="72" bgcolor="black" :color="colorDisplay" :value="year4"></Display7>
      </DisplayLabeled>            
      <div class="display-ampm">
        <div class="display-ampm-content">
          <AMPM :color="color" :size="16" :hour="hours"/>
        </div>
      </div>

      <DisplayLabeled class="display-hour" name="Hour">
          <Display7 :fontSize="72" bgcolor="black" :color="colorDisplay" :value="time1"></Display7>
          <Display7 :fontSize="72" bgcolor="black" :color="colorDisplay" :value="time2"></Display7>          
      </DisplayLabeled>

      <div class="display-leds">
        <div class="leds">
        <Led class="led1" :color="color" :on="true" :size="16"/>
          <Led class="led2" :color="color" :on="true" :size="16"/>
        </div>
      </div>

      <DisplayLabeled class="display-hour" name="Minute">      
          <Display7 :fontSize="72" bgcolor="black" :color="colorDisplay" :value="time3"></Display7>
          <Display7 :fontSize="72" bgcolor="black" :color="colorDisplay" :value="time4"></Display7>
      </DisplayLabeled>

      <div  class="tag-time-display-name">
        <Tag class="tag-label"  :fontSize="24" :value="label" bgcolor="black"></Tag>
      </div>
      
      
    
    </div>
  </div>

</template> 
<script lang="ts">
  import { Component, Prop, Vue,Watch } from 'vue-property-decorator';  
  import {StateVuexTaulukko} from '@/store/types';
  import bus from "@/bus"; 
  import {default as AMPM} from "@/components/alarm/AMPM.vue";
     import {default as Display7} from "@/components/alarm/Display7.vue";
  import {default as DisplayLabeled} from "@/components/alarm/DisplayLabeled.vue";
  import {default as Tag} from "@/components/alarm/Tag.vue";
  import {default as Led} from "@/components/alarm/Led.vue";

  export interface ButtonMouseEvent
  { 
        event:MouseEvent;
        id:string; 
  }
  
  @Component({
    name: 'TimeDisplay', 
    components: { AMPM,Display7,DisplayLabeled, Tag,Led
    }
  } )
export default class TimeDisplay extends Vue { 
    
    
  @Prop(  {required: true, type : Date,default:false} ) date !: Date;
  @Prop(  {required: true, type : String,default:false} ) label !: string;
  @Prop(  {required: true, type : String,default:"#00FF00"} ) color !: string;

 
  mounted(){
    bus.store = this.$store;     

  }

  get colorDisplay():string
  {
    if(this.color=="green")
    {
      return "#00FF00";
    }
    else if(this.color=="red")
    {
      return "#FF2D2D";
    }
    else
    {
      return "#FFC900";
    }
  }

  get month():string{
    switch(this.date.getMonth()+1)
    {
      case 1:
        return "JAN";
      case 2:
        return "FEB";
      case 3:
        return "MAR";
      case 4:
        return "APR";
      case 5:
        return "MAY";
      case 6:
        return "JUN";
      case 7:
        return "JUL";
      case 8:
        return "AUG";
      case 9:
        return "SEP";
      case 10:
        return "OCT";
      case 11:
        return "NOV";
      case 12:
        return "DEC";
      default:
        throw new Error("Invalid month");
    }
    
  }

  get month1():string{
    return this.month.substring(0,1);
  }
  get month2():string{
    return this.month.substring(1,2);
  }
  get month3():string{
    return this.month.substring(2,3);
  }
  get day1():string{
    return Math.floor(this.date.getDate()/10).toString();
  }
  get day2():string{
    return (this.date.getDate()%10).toString();
  }
   
  get year1():string{
    return Math.floor(this.date.getFullYear()/1000).toString();
  }

  
  get year2():string{
    const centuries : number = this.date.getFullYear() %1000;
    return Math.floor(centuries/100).toString();
  }

  
  get year3():string{
    const decades : number = this.date.getFullYear() %100;
    return Math.floor(decades/10).toString();
  }

  
  get year4():string{
    const years : number = this.date.getFullYear() %10;
    return years.toString();
  }

  get hours():number{
    return this.date.getHours();
  }

 
  get time1():string{
    let  hours : number =  this.date.getHours() ;
    hours = (hours>12)?hours-12:hours;
    hours = Math.floor(hours/10 );
    return hours.toString();
  }
  
  get time2():string{
    let hours : number =  this.date.getHours() ;
    hours = (hours>12)?hours-12:hours;
    hours =  hours %10  ;
    return hours.toString();
  }
   
  get time3():string{
    const hours : number = Math.floor( this.date.getMinutes() /10 );
    return hours.toString();
  }
  get time4():string{
    const hours : number =  this.date.getMinutes() %10  ;
    return hours.toString();
  }
 
  @Watch("enabled")  @Watch("width")  @Watch("height")
  onChangeCommon(after:boolean )
  { 
  }
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#outergame{
  .container-main-time-display{

    background-color: gray;
    width:1000px;
    padding:1em;
    border-color: black;
    border-style: solid;
    border-width: 10px;
    padding-left: 60px;

    .container-time-display > *{
      display: inline-block;
      
    }
    
    .display-ampm-content{
      display: initial;
    }

    .display-leds
    {
      display:inline-grid;
      vertical-align: bottom;
      margin-left: -10px;
      margin-top: 10px;
      .leds 
      {   
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows:  1fr 1fr;
        gap: 0px 0px;
        grid-template-areas:
        "content1"
        "content2"
        ;

        .led1
        {
          grid-area: content1;
        }
        .led2
        {
          grid-area: content2;
        }
      }
    }
 
    .display-month,.display-day,.display-hour
    {
      margin-right:20px;
    }
 
    .tag-time-display-name
    {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr ;
      grid-template-rows: 1fr;
      gap: 0px 0px;
      grid-template-areas:
      ". center .";
      margin-top:0.5em;

      .tag-label{
        grid-area:center;
      }
    }

  }
    
}


</style>
