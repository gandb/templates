import { Component, OnInit } from '@angular/core';
import {CalculadoraService} from '../../services';


@Component({
  selector: 'calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.scss']
})
export class CalculadoraComponent implements OnInit {


  number1:string = "0";
  number2?:string;
  operation?:string;
  result?:string;
  memory?:string;

  constructor(private calculadoraService:CalculadoraService) { }

  ngOnInit(): void {
  }

  get display():string{
    if(this.result)
    {
      return this.result as string;
    }

    if(this.operation)
    {
      return this.number2 as string;
    }

    return this.number1;

  }

  cleanup():void
  {
     this.number1 = "0";
     this.number2 = undefined;
     this.operation = undefined;
     this.result=undefined;
  }


  chooseNumber(number:string):void
  {
    if(this.operation)
    {
      this.number2 = this.concatNumber(this.number2 as string,number);
    }
    else{
      this.number1 = this.concatNumber(this.number1,number);
    }
  }

  calc()
  {
    let result:number = this.calculadoraService.calculateNumbers(this.number1,this.number2 as string, this.operation as string);
    this.number1 = result.toString(10);
    this.number2 = "0";
    this.result = this.number1;
  }


  chooseOperator(operator:string):void
  {
    if(this.number2)
    {
      this.calc();
    }
    else
    {
      this.number2 = "0";
    }
    this.operation = operator;
  }

  semiCleanup()
  {
    this.result = undefined;
    this.operation = undefined;
    this.number2 = undefined;
  }

  changeSignal()
  {
    if(this.result)
    {
      this.semiCleanup();
    }

    let ret :number;

    if(this.operation )
    {
      ret = parseFloat(this.number2 as string);
    }
    else{
      ret = parseFloat(this.number1);
    }

    ret *= -1;

    if(this.operation )
    {
      this.number2 = ret.toString(10);
    }
    else{
      this.number1 = ret.toString(10);
    }

  }

  putMemory()
  {
    if(this.result)
    {
      this.semiCleanup();
    }

    if(this.memory)
    {
      if(this.operation )
      {
        this.number2 = this.memory ;
      }
      else{
        this.number1 = this.memory ;
      }
      this.memory = undefined;
    }
    else
    {
      if(this.operation )
      {
        this.memory = this.number2;
      }
      else{
        this.memory = this.number1;
      }

    }

  }

  returnNumber()
  {
    if(this.result)
    {
      this.semiCleanup();
    }
    if(this.operation)
    {
      if(this.number2?.length==1)
      {
        this.number2 = '0';
        return;
      }
      this.number2 = this.number2?.substring(0,this.number2.length-1);
    }
    else{
      if(this.number1?.length==1)
      {
        this.number1 = '0';
        return;
      }
      this.number1 = this.number1?.substring(0,this.number1.length-1);
    }
  }

  concatNumber(number1:string,number2:string):string
  {
    this.result = undefined;
    if( number1.indexOf(".")>=0 && number2=='.')
    {
      return this.number1;
    }
    if( number1=='0' && number2!='.')
    {
      number1 = '';
    }

    return number1 + number2;
  }

}
