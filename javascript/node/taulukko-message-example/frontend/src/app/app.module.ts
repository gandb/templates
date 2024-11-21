import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component'; 
//import { TesteA } from 'taulukko-testea-lib/projects/testea/src/public-api';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule//,
  //  TesteA
     
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
