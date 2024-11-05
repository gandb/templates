import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { RegisterService } from './register.service';
import { Response } from '../commmon/response';
import { Global } from '../commmon/global';
import { MessageData } from '../ui/message';
import { GlobalMessageComponent } from '../ui/message/global-message.component';
import { MessageDataType } from '../ui/message/message-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  providers: [Global],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent  {
  email?: string;
  confirmEmail?: string;
  password?: string;
  confirmPassword?: string;


  constructor(private router: Router,private registerService:RegisterService,private global:Global) {

  }

  
  private message(messageData:MessageData):void{
    this.global.eventManager.publish({name:GlobalMessageComponent.EVENT_GLOBAL_MESSAGE,data:messageData});
  }
  

  private validateForm(): string | null {
    if (this.email === undefined || this.password === undefined) {
      return 'Todos os campos são obrigatórios.';
    }
  
    if (this.email !== this.confirmEmail) {
      return 'Os emails não correspondem.';
    }
  
    if (this.password !== this.confirmPassword) {
      return 'As senhas não correspondem.';
    }
   
    return null;
  }

  async onSubmit() {

    const validationMessage = this.validateForm();
    if (validationMessage) {
      this.message({ message: validationMessage, type: MessageDataType.ERROR, timeoutSeconds: 5 });
      return;
    }

      const response:Response<string> = await this.registerService.register(this.email as string, this.password as string);

        
      if(response.code==503)
        {
          this.message({message: "Erro no servidor! Tente mais tarde.",type:MessageDataType.ERROR,timeoutSeconds:5});  
          return;
        }

      if(response.code!=0)
      { 
        this.message({message:response.data,type:MessageDataType.ERROR,timeoutSeconds:5});  
        return;
      }
   
      this.message({message:"Registrado com sucesso! Aguarde a sua conta ser validada, enviaremos um e-mail para você!",type:MessageDataType.ERROR,timeoutSeconds:5});  

      this.router.navigate(['/']);


  }
}
