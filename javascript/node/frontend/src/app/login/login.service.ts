import { Injectable } from '@angular/core';
import { Response } from '../commmon/response'; 
import { Environment } from '../../environments/environment';
import {default as httpClient} from '../commmon/httpClient';
import {responseHandler} from "../commmon/response-handler";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl =Environment.instance.endpoint + '/users/auth';

  constructor() { }


  public async login(email: string, password: string): Promise<Response<string>> {
    
    const response = await responseHandler<string>(async () => {
        return (await httpClient.post<Response<string>>(`${this.apiUrl}`, { email, password })).data;
    });
    return response;
};

}
