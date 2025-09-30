import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My Reddit';

  add(title:HTMLInputElement, text:HTMLInputElement)
  {
    console.log("Deu certo " + title.value);
    return "test";
  }
}
