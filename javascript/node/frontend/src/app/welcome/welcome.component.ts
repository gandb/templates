import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { Environment } from '../../environments/environment';
import { Global } from '../commmon/global';
import { GlobalMessageComponent } from '../ui/message/global-message.component';
import { MessageData } from '../ui/message';
import { MessageDataType } from '../ui/message/message-data';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  providers: [Global],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {
  title = 'contas';
  private _global:Global;
  constructor(private router: Router, global:Global ) {
      this._global = global;
  }
  goToRegister() {
    this.router.navigate(['/register']);
  }
}
