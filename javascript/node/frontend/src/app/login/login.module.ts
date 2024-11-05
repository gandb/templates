import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoginComponent,
    LoginService
  ]
})
export class LoginModule { }
