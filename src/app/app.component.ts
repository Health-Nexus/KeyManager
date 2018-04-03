import { Component, OnInit } from '@angular/core';
import { Web3Service } from './shared/web3/web3.service';
import { HealthcashService } from './shared/web3/healthcash.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Health Nexus Wallet';
  authorized: boolean = false;

  constructor(private web3Service:Web3Service,private healthcashService:HealthcashService) {
      this.web3Service.initializeWeb3();
      this.healthcashService.initializeWeb3();
  }

  ngOnInit() {
    this.web3Service.loginChanged$.subscribe(
    authed => {
      this.authorized = authed;
    });
  }

  balance(): any{
    this.healthcashService.balanceOf();
  }

  // test(): any{
  //   this.web3Service.dataRequestTest();
  // }


  transferOwnership(): any{
    this.healthcashService.transferOwnership();
  }

  getNumberService(): any{
    this.web3Service.getServiceCount();
  }

  getServiceURL(id): any{
    this.web3Service.getServiceURL(id);
  }

  setTransferAgent(): any{
    this.healthcashService.setTransferAgent();
  }

}
