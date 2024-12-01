import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyLibComponent } from 'my-lib';



@NgModule({
  declarations: [MyLibComponent],
  imports: [
    CommonModule
  ],
  exports:[
    MyLibComponent
  ]
})
export class MyLibModule { }
