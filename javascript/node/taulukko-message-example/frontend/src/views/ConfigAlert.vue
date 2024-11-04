<template>
	<div class="content"> 
		<message v-if="error!=''" :content="error" type="error" @onClose="onClose" />
		<H1>Configurações ${{$store.state.alert.selected.id}}</H1>

		<div class="frmInsert">

			<div class="ui labeled input divName">
				<div class="ui label">
					Name
				</div>
				<input type="text" v-model="alert.name" >
			</div>

			<div class="ui labeled input divTime">
				<div class="ui label">
					Horário
				</div>
				<input type="time" v-model="time">
			</div>

			<div class="ui labeled input divEnabled">
				<div class="ui label">
					Habilitado
				</div>
				<input type="checkbox" v-model="alert.enabled">
			</div>

			<div class="actions divActions">
					<button @click="onCancel" >Cancelar</button>
					<button @click="onUpdate">Salvar</button>
			</div>
		</div>
 
	</div>
</template>


<script lang="ts">
	import {  Component, Vue } from 'vue-property-decorator';
	import Message from '@/components/Message.vue'; 
	import bus from "@/bus";

	interface AlertDTO
	{
		name:string,
		time:string,
		enabled:boolean,

	}

   @Component({name: 'ConfigAlert', 
		components: {Message
		}
	  } )

	export default class ConfigAlert extends Vue {

		logged:boolean = false;
		alert:AlertDTO = {name:"",time:"",enabled:false};
		error:string = "";
		
		

		mounted()
		{ 

       		bus.store = this.$store;
			this.logged = this.$store.state.user.logged;
			this.alert = this.$store.state.alert.selected;
			bus.onUpdateLoginStatus((data:any)=>{
					this.logged =  data.success;
			}); 

			console.log("mounted:", this.$store.state.alert.selected)
			 
		}

		get time() :string
		{
			//return parseInt(this.alert.time) /100 + ":" + parseInt ( this.alert.time ) %100;
			const timeNumber:number = parseInt(this.alert.time);
			const leftSideHour : string =  (timeNumber<1000)?"0":"" ;
			const hour:string = leftSideHour + Math.floor( timeNumber / 100 );
			const leftSideMinute : string =  (timeNumber % 100 < 10)?"0":"" ;
			const minute :string = leftSideMinute + timeNumber % 100 ;

			const timeString = hour   + ":" + minute;
			
			return timeString;
		}

		set time(value:string)
		{
			console.log("setTime t:",value);
			const timeParts:string[]=value.split(":");
			const time:number = parseInt(timeParts[0],10)*100 + parseInt(timeParts[1],10);
			console.log("setTime d:",time);
			this.alert.time  = time + "";

		}

		onCancel()
		{

			this.$router.push("/");
		}

		async onUpdate()
		{

			if(this.alert.name=="")
			{
				this.error="Nome é obrigatório!";
				return;
			}

			if(this.alert.time=="")
			{
				this.error="Horário é obrigatório!";
				return;
			}
			await this.$store.dispatch("alert/updateAlert",this.alert);
			this.$router.push("Alerts");
		}

		onClose()
		{
			this.error="";
		}
		
	}
</script>

<style scoped lang="scss">
	
#outergame{
	.content
	{

		margin:20px;

		.frmInsert 
		{
			display: grid;
			width:70%;
			grid-template-columns: 1fr 1fr 1fr;
			grid-template-rows: 1fr 1fr 1fr;
			gap: 20px 20px;
			grid-template-areas:
			"divName divName divTime"
			"divEnabled divEnabled divEnabled"
			"divActions divActions divActions";

			.divName{
				grid-area: divName;
			}
			.divTime{
				grid-area: divTime;
			}
			.divEnabled{
				grid-area: divEnabled;
				input{
					height:30px
				}
			}
			.actions{
				grid-area: divActions;
		
				button
				{
					display: inline-block;
				}	
			}

			
		}
	}

}	
</style>
