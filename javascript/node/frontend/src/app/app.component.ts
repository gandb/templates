import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlobalMessageComponent } from './ui/message/global-message.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,GlobalMessageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'contas';
}
