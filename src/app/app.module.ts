import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DrsService } from './shared/web3/drs.service';
import { HealthcashService } from './shared/web3/healthcash.service';
import { WindowRefService } from './shared/window-ref.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { DrsComponent } from './drs/drs.component';
import { TokenComponent } from './token/token.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tab/tab.component';

@NgModule({
  declarations: [
    AppComponent,
    DrsComponent,
    TokenComponent,
    HeaderComponent,
    FooterComponent,
    WelcomeComponent,
    TabsComponent,
    TabComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, HttpModule
  ],
  providers: [DrsService, HealthcashService, HttpClientModule, WindowRefService],
  bootstrap: [AppComponent]
})
export class AppModule { }
