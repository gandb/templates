<template>
	<div class="content"> 
		<message v-if="error!=''" :content="error" type="error" @onClose="onClose" />
		<H1>Alerta</H1>

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
				<input type="time" v-model="alert.time">
			</div>

			<div class="ui labeled input divEnabled">
				<div class="ui label">
					Habilitado
				</div>
				<input type="checkbox" v-model="alert.enabled">
			</div>

			<div class="actions divActions">
					<button @click="onCancel" >Cancelar</button>
					<button @click="onInsert">Inserir</button>
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

   @Component({name: 'Alert', 
		components: {Message
		}
	  } )

	export default class Alert extends Vue {

		logged:boolean = false;
		alert:AlertDTO = {name:"",time:"",enabled:false};
		error:string = "";
		

		mounted()
		{ 

       		bus.store = this.$store;
			this.logged = this.$store.state.user.logged;
			bus.onUpdateLoginStatus((data:any)=>{
					this.logged =  data.success;
			}); 

			 
		}

		onCancel()
		{

			this.$router.push("/");
		}

		async onInsert()
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

			await this.$store.dispatch("alert/insertAlert",this.alert);
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
