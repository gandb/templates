import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class CalculadoraService {


  calculateNumbers(number1:string , number2:string, operation:string ):number
  {
    let num1:number = parseFloat(number1);
    let num2:number = parseFloat(number2);

    if(operation=='+')
    {
      return num1+num2;
    }

    if(operation=='-')
    {
      return num1-num2;
    }

    if(operation=='*')
    {
      return num1*num2;
    }

    return num1/num2;
  }



 }
