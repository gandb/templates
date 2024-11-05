import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Global } from '../commmon/global';
import { FormsModule } from '@angular/forms';
import { Environment } from '../../environments/environment';
import { MessageData } from '../ui/message';
import { GlobalMessageComponent } from '../ui/message/global-message.component';
import { MessageDataType } from '../ui/message/message-data';
import { Response } from '../commmon/response';
import { RegisterService } from '../register/register.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
}) 
 
export class LoginComponent {
  email: string = '';
  password: string = '';

  private _global:Global;

  constructor(private router: Router,private global:Global,private loginService:LoginService ){
    this._global = global;
  }

  get valid():boolean{
    return this.email.length >0  && this.password.length >0 ;
  }

  private message(messageData:MessageData):void{
    this.global.eventManager.publish({name:GlobalMessageComponent.EVENT_GLOBAL_MESSAGE,data:messageData});
  }

  async onSubmit() {
    
    if(this.email==undefined || this.password == undefined)
    { 
      this.message({message:'Todos os campos são obrigatórios.',type:MessageDataType.ERROR,timeoutSeconds:5}); 
      return;
    }
       
    const response:Response<string> = await this.loginService.login(this.email as string, this.password as string);

    if(response.code==503)
    {
      this.message({message:"Erro no servidor! Tente mais tarde.",type:MessageDataType.ERROR,timeoutSeconds:5});
      return;
    }

    if(response.code!=0)
    {
      this.message({message:response.data,type:MessageDataType.ERROR,timeoutSeconds:5}); 
      return;
    }

    console.log("response",response);
    
      
    localStorage.setItem('token', response.data);
    this.message({message:"Logado com sucesso!",type:MessageDataType.INFO,timeoutSeconds:5});    
    this.router.navigate(['/dashboard']);

  }
}