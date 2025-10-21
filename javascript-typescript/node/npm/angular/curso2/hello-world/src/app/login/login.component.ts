import { Component } from '@angular/core';
import {FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ FormsModule],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
   credentials = {
    username: '',
    password: ''
  };

  

  constructor(private readonly authService:AuthService) {}

    login() {
    console.log('Tentando logar com:', this.credentials);
    this.authService.login(this.credentials);
  }
}
