<template>

  <div class="t-carroussel">
 
    <div class="slideshow-container">

        <div class="mySlides fade" v-for="(slide,index) in slides" v-bind:key="slide.id" >
            <div class="numbertext">{{index+1}}/ {{slidesCount()}}</div>
            <div class="t-slide-content">
              <slot :name="`content${index+1}`"> </slot>
            </div>
            <div class="text" v-bind:style="buildStyleTitle(slide)">{{slide.title}}</div>
        </div>
 
 
      <a class="prev" @click="plusSlides(-1)">&#10094;</a>
      <a class="next" @click="plusSlides(1)">&#10095;</a>
    </div>
    <br>

    <!-- The dots/circles -->
    <div style="text-align:center">
      <span 
        v-for="(slide,index) in slides" v-bind:key="slide.id" 
        class="dot" @click="currentSlide(index+1)"></span> 
    </div>


  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue,Watch } from 'vue-property-decorator';  
  
@Component({
  name: 'Carrounssel', 
  components: { 
  }
} )
export default class Carrounssel extends Vue { 

    @Prop({required:true }) slides !: Array<any> ;
    slideIndex:number = 1;
     dynamicSlotName:string="tres";
     teste:string="color:#CCC";

    mounted()
    { 
        console.log("slides=",this.slides);

        this.showSlides(this.slideIndex);
    }

    buildStyleTitle(slide:any)
    {
      return "color:" + slide.titleColor; 
    }

    slidesCount():number
    {
      return this.slides.length;
    }

      // Next/previous controls
      plusSlides(n:number) {
        this.showSlides(this.slideIndex += n);
      }

      // Thumbnail image controls
      currentSlide(n:number) {
        this.showSlides(this.slideIndex = n);
      }

      showSlides(n:number) {
        var i;
        var slides = document.getElementsByClassName("mySlides");
        var dots = document.getElementsByClassName("dot");
        if (n > slides.length) {this.slideIndex = 1}
        if (n < 1) {this.slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            (slides[i] as any).style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        (slides[this.slideIndex-1] as any).style.display = "block";
        dots[this.slideIndex-1].className += " active";
      }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 
* {box-sizing:border-box}

/* Slideshow container */
.slideshow-container {
  max-width: 1000px;
  position: relative;
  margin: auto;
}

/* Hide the images by default */
.mySlides {
  display: none;
}

/* Next & previous buttons */
.prev, .next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  margin-top: -22px;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
}

/* Position the "next button" to the right */
.next {
  right: 0;
  border-radius: 3px 0 0 3px;
}

/* On hover, add a black background color with a little bit see-through */
.prev:hover, .next:hover {
  background-color: rgba(0,0,0,0.8);
}

/* Caption text */
.text {
  color: #f2f2f2;
  font-size: 15px;
  padding: 8px 12px;
  position: absolute;
  bottom: 8px;
  width: 100%;
  text-align: center;
}

/* Number text (1/3 etc) */
.numbertext {
  color: #f2f2f2;
  font-size: 12px;
  padding: 8px 12px;
  position: absolute;
  top: 0;
}

/* The dots/bullets/indicators */
.dot {
  cursor: pointer;
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}

.active, .dot:hover {
  background-color: #717171;
}

/* Fading animation */
.fade {
  -webkit-animation-name: fade;
  -webkit-animation-duration: 1.5s;
  animation-name: fade;
  animation-duration: 1.5s;
}

@-webkit-keyframes fade {
  from {opacity: .4}
  to {opacity: 1}
}

@keyframes fade {
  from {opacity: .4}
  to {opacity: 1}
}
.t-slide-content > *
{
  width:100%;
}
</style>
