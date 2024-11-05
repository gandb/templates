import { Injectable } from '@angular/core';
import { Response } from '../commmon/response';
import { Environment } from '../../environments/environment';
import {default as httpClient, HttpResponse} from '../commmon/httpClient';
import { responseHandler } from '../commmon/response-handler';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl =Environment.instance.endpoint + '/users';

  constructor() { }

  private validatePassword(password: string): boolean {
    let hasLowercase = false;
    let hasUppercase = false;
    let hasNumber  = false;
    let hasSpecial = false;

    if(password.length<8)
    {
      return false;
    }
   //console.log("validatePassword 1");

    for (let i = 0; i < password.length; i++) {
    //  console.log("validatePassword 2");

      const char = password[i];

      if (char >= 'a' && char <= 'z') {
        hasLowercase = true;
     //   console.log("validatePassword 3");

      } else if (char >= 'A' && char <= 'Z') {
        hasUppercase = true;
    //    console.log("validatePassword 4");

      } else if (char >= '0' && char <= '9') {
      //  console.log("validatePassword 5");

        hasNumber = true;
      } else {
       // console.log("validatePassword 6");

        hasSpecial = true;
      }
    }
    console.log( hasLowercase , hasUppercase , hasNumber , hasSpecial);
    return hasLowercase && hasUppercase && hasNumber && hasSpecial;
  }



  private  validateEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }


  private validateRegister(email:string, password:string){



    if(!this.validatePassword(password))
    {
      alert('A senha precisa ser maior que 8 caracters, ter uma letra minúscula, uma maíuscula,  um número e pelo menos um símbolo.');
      return false;
    }

    if(!this.validateEmail(email))
      {
        alert('E-mail inválido');
        return false;
      }

    return true;
  }

  public async register(email: string, password: string): Promise<Response<string>> {
    if(!this.validateRegister(email,password))
      {
        return new Promise<Response<string>>((resolve)=>{
          const error:Response<string> = {code:-1,data:"WRONG_PASSWORD"};
           resolve(error)
        });
      }
  
    
    const response = await responseHandler<string>(async () => {
        return (await httpClient.post(`${this.apiUrl}`, { email, password })).data;
    });
    return response;
};
 
}
