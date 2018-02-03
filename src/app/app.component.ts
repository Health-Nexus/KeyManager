import { Component } from '@angular/core';
import { Web3Service } from './shared/web3/web3.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Health Nexus Wallet';

  constructor(private web3Service:Web3Service) {
      web3Service.initializeWeb3();
  }

  test(): any{
    this.web3Service.test();
  }

  createService2(): any{
    console.log('here')
    this.web3Service.createservice();
  }
  getNumberService(): any{
    this.web3Service.getServiceCount();
  }
  getServiceURL(id): any{
    this.web3Service.getServiceURL(id);
  }


}
