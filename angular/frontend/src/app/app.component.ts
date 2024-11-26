import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'teste';
  minhaFuncao() {
    console.log('Função chamada ao clicar na tag <a>!');
    // Adicione a lógica desejada aqui
  }

}
