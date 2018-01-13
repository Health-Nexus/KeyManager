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
      web3Service.intializeWeb3('0xa96a6269f13b9cf0eb82dc4af916bbe926f34e0db92d5c3d68fa029a9f5462d7','0x7e9eFE5712aCAaE3E00839F48F48c0eefBfE5C77');
  }

}
