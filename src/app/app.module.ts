import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Web3Service } from './shared/web3/web3.service';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [Web3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
