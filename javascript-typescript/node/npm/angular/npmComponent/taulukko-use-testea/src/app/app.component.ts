import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import  {MyLibComponent,MyLibService} from "taulukko-test-myliba";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MyLibComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'taulukko-use-testea';
  echo:String = "";
  triggerServiceAction() {
    this.echo = new MyLibService().echo("xisto");
  }

}
