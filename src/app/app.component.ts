import { Component } from '@angular/core';
import { Web3Service } from './shared/web3/web3.service';
import { HealthcashService } from './shared/web3/healthcash.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Health Nexus Wallet';

  constructor(private web3Service:Web3Service,private healthcashService:HealthcashService) {
      this.web3Service.initializeWeb3();
      this.healthcashService.initializeWeb3();

  }

  balance(): any{
    this.healthcashService.balanceOf();
  }


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
