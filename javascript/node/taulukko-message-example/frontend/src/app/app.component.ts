import { Component } from '@angular/core'; 
//import {TesteA} from "taulukko-testea-lib/projects/testea/src/public-api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'teste';

  ngOnInit() { 
    //const subscriber:Subscriber = Subscriber.create({topics:["keep-alive"]}); 
   // subscriber.on(((message:Message)=>{
    //  console.log("New message : " ,message);
   // })as Listener);
  }

  minhaFuncao() {
    console.log('Função chamada ao clicar na tag <a>!');
//    console.log("echo aaaa",new TesteA().echo("aaa"));
    // Adicione a lógica desejada aqui
  }

}
