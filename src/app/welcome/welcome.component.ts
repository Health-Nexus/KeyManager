import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  isWeb3: boolean;

  constructor() { 

    // let Web3 = require('web3');
    console.log(window);

    window.addEventListener('load', async () => {
      const Eth = require('ethjs');
      let eth = new Eth(new Eth.HttpProvider('https://rinkeby.infura.io'));
      // const Web3 = require('web3');
      // Modern dapp browsers...
      // let web3: any;
      if ((window as any)['ethereum']) {
        // web3 = new Web3((window as any)['ethereum']);
        eth = new Eth(new Eth.HttpProvider('https://rinkeby.infura.io'));
        try {
          // Request account access if needed
          let res = await (window as any)['ethereum'].enable();
          console.log(res);
        } catch (error) {
          // User denied account access...
        }
      }
      // Legacy dapp browsers...
      else if ((window as any)['web3']) {
        // web3 = new Web3((window as any)['web3'].currentProvider);
        eth = new Eth(new Eth.HttpProvider('https://rinkeby.infura.io'));
        // Acccounts always exposed
      }
      // Non-dapp browsers...
      else {
        console.log(
          'Non-Ethereum browser detected. You should consider trying MetaMask!'
        );
        // return dispatch(setMetamaskLoadingStage('Error'))
      }
    });
  };

  ngOnInit() { 
    if (window.hasOwnProperty('web3')) {
      this.isWeb3 = true;
    };
  };

  reloadPage() {
    if (!window.hasOwnProperty('web3')) {
      (window as any)['ethereum'].enable();
    } else {
      location.reload();
    };
  };

};
