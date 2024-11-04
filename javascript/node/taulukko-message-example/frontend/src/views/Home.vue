<template>
	<div class="t-home"> 
			<welcome v-if="!logged"/>
			<profile  v-if="logged"/>  
	</div>
</template>


<script lang="ts">
	import {  Component, Vue } from 'vue-property-decorator';
	import Layout from '@/components/Layout.vue';
	import HeaderMenu from '@/components/HeaderMenu.vue';
	import FooterMenu from '@/components/FooterMenu.vue';
	import Welcome from '@/components/local/home/Welcome.vue';
	import Profile from '@/components/local/home/Profile.vue';
	import bus from "@/bus";
	import {Subscriber,Message} from "taulukko-messages"; 
   
   @Component({name: 'Home', 
		components: {
			 HeaderMenu,FooterMenu,Welcome,Profile
		}
	  } )
	  
	export default class Home extends Vue {

		logged:boolean = false;

		mounted()
		{ 

       		bus.store = this.$store;
			this.logged = this.$store.state.user.logged;
			bus.onUpdateLoginStatus((data:any)=>{
					this.logged =  data.success;
			}); 
			const subscriber:Subscriber = Subscriber.create("topics":["keep-alive"]);
			await subscriber.open();
			subscriber((message:Message)=>{
				console.log("message:",message);
			});
		}
		
	}
</script>

<style scoped>
	
  
</style>
