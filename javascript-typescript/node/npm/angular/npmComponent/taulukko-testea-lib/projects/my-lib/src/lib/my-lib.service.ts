import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyLibService {

  constructor() { }

  echo(s:String):String{
    return "echo: " + s;
  }
}
