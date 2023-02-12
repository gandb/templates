import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalculadoraModule } from './components/calculadora/calculadora.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JogoDaVelhaComponent } from './components/jogo-da-velha/jogo-da-velha.component';
import { FormsModule } from '@angular/forms';
import { SelectorPlayerComponent } from './components/selector-player/selector-player.component';
import { BoardGameComponent } from './components/board-game/board-game.component';
import { OutputComponent } from './components/output/output.component';

@NgModule({
  declarations: [
    AppComponent,
    JogoDaVelhaComponent,
    SelectorPlayerComponent,
    BoardGameComponent,
    OutputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CalculadoraModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
