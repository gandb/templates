import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import  {MyLibComponent,MyLibService} from "taulukko-angular-messages-test";
 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MyLibComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  implements OnDestroy, OnInit{

  title = 'taulukko-use-testea';
  echo:String = "";
 
  constructor(private service: MyLibService){

  

  }

  triggerServiceAction() {
      this.service.publish("[publicando texto teste]"); 
  }

  ngOnInit(): void {
    console.log("ngOnInit");
  }

  ngOnDestroy(): void {
    console.log("ngOnDestroy");
  }
}
