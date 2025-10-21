import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'
})
  // em futuras versoes da pra remover o  providedIn: 'root'

export class AuthService {

  constructor(private readonly http:HttpClient) { }

  login(credentials:{username:string, password:string}) {
    console.log("Login chamado no service com:", credentials  );
    return this.http.post('https://api.restful-api.dev/objects', credentials);
  }
}
