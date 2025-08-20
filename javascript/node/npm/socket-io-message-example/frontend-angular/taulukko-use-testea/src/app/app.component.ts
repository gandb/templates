import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import  {MyLibComponent,MyLibService} from "taulukko-angular-socketio-test";
 
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

    const firstTest:String = service.echo("firstTest");
  

  }

  triggerServiceAction() {
    const echo:String = this.service.echo("xisto");
    console.log(this.echo);
    this.echo = echo;
  }

  ngOnInit(): void {
    console.log("ngOnInit");
  }

  ngOnDestroy(): void {
    console.log("ngOnDestroy");
  }
}
