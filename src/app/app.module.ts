import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Web3Service } from './shared/web3/web3.service';
import { HealthcashService } from './shared/web3/healthcash.service';
import { WindowRefService } from './shared/window-ref.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import { DrsComponent } from './drs/drs.component';
import { TokenComponent } from './token/token.component';

@NgModule({
  declarations: [
    AppComponent,
    DrsComponent,
    TokenComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, HttpModule
  ],
  providers: [Web3Service, HealthcashService, HttpClientModule, WindowRefService],
  bootstrap: [AppComponent]
})
export class AppModule { }
