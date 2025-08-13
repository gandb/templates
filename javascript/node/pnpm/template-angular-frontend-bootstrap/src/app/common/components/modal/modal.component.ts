import { CommonModule } from '@angular/common';
import { Component  } from '@angular/core';

@Component({
    selector: 'app-modal',
    imports: [CommonModule],
    templateUrl: './modal.component.html',
    styleUrl: './modal.component.scss'
})
export class ModalComponent {
  showValue:boolean =false; 
  constructor() {
    this.showValue = false;
   }


  toggle () {
    this.showValue = !this.showValue;
  }
  show(){
    this.showValue = true;
  }
  hide(){
    this.showValue = false;
  }
  get status():boolean{
    return this.showValue;
  }
    
}