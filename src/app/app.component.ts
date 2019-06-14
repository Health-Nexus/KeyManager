import { Component, OnInit } from '@angular/core';
import { DrsService } from './shared/web3/drs.service';
import { HealthcashService } from './shared/web3/healthcash.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Health Nexus Wallet';
  isRinkeby: boolean;
  authorized: boolean = false;

  constructor(private drsService:DrsService,private healthcashService:HealthcashService) {

    if (!window.hasOwnProperty('web3')) {
      return;
    }

    this.drsService.initializeWeb3();
    this.healthcashService.initializeWeb3();


  }

  ngOnInit() {
    this.drsService.loginChanged$.subscribe(
    authed => {
      this.authorized = authed;
    });

    switch(this.drsService.web3.version.network) {
      case '1':
       this.isRinkeby = false;
       break;
      case '4':
      this.isRinkeby = true;
       break;
      default:
      this.isRinkeby = false;
    };

  }

  balance(): any{
    this.healthcashService.balanceOf();
  }

  transferOwnership(): any{
    this.healthcashService.transferOwnership('');
  }

  getNumberService(): any{
    this.drsService.getServiceCount();
  }

  getServiceURL(id): any{
    this.drsService.getServiceURL(id);
  }

  setTransferAgent(): any{
    this.healthcashService.setTransferAgent();
  }
}
