import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; 
import { MyLibComponent } from 'my-lib';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MyLibComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'taulukko-testea-lib';
}
