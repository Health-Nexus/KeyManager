import { Injectable, EventEmitter, Output } from '@angular/core';
// const Web3 = require('web3');

@Injectable()
export class Web3Service {

  constructor() { }
  @Output() update = new EventEmitter();
   private contractAddr: string = ''//'0xcebe9aa3b41a0b12d28ebcb7931fff0e0244165b'; // Current address if the user selects a custom
   private defaultNodeIP: string = 'MetaMask';                    // Default node
   private nodeIP: string;                                                      // Current nodeIP
   private nodeConnected: boolean = true;                                       // If we've established a connection yet
   private adding: boolean = false;                                             // If we're adding a question
   private web3Instance: any;                                                   // Current instance of web3
   private unlockedAccount: string;
   private privateKey: string;
   private address: string;
                                   // Current unlocked account
   // Application Binary Interface so we can use the question contract
   //private ABI  = [{'constant':false,'inputs':[{'name':'queryID','type':'bytes32'},{'name':'result','type':'string'}],'name':'__callback','outputs':[],'type':'function'},{'constant':true,'inputs':[{'name':'','type':'uint256'}],'name':'questions','outputs':[{'name':'contractAddress','type':'address'},{'name':'site','type':'string'},{'name':'questionID','type':'uint256'},{'name':'winnerAddress','type':'address'},{'name':'winnerID','type':'uint256'},{'name':'acceptedAnswerID','type':'uint256'},{'name':'updateDelay','type':'uint256'},{'name':'expiryDate','type':'uint256'},{'name':'ownedFee','type':'uint256'}],'type':'function'},{'constant':false,'inputs':[],'name':'kill','outputs':[],'type':'function'},{'constant':true,'inputs':[{'name':'_i','type':'uint256'},{'name':'_sponsorAddr','type':'address'}],'name':'getSponsorBalance','outputs':[{'name':'sponsorBalance','type':'uint256'}],'type':'function'},{'constant':false,'inputs':[{'name':'_questionID','type':'uint256'},{'name':'_site','type':'string'}],'name':'handleQuestion','outputs':[],'type':'function'},{'constant':false,'inputs':[{'name':'_i','type':'uint256'}],'name':'increaseBounty','outputs':[],'type':'function'},{'constant':true,'inputs':[],'name':'contractBalance','outputs':[{'name':'','type':'uint256'}],'type':'function'},{'constant':true,'inputs':[{'name':'_questionID','type':'uint256'},{'name':'_site','type':'string'}],'name':'getAddressOfQuestion','outputs':[{'name':'questionAddr','type':'address'}],'type':'function'},{'constant':true,'inputs':[{'name':'_i','type':'uint256'}],'name':'getSponsors','outputs':[{'name':'sponsorList','type':'address[]'}],'type':'function'},{'inputs':[],'type':'constructor'},{'anonymous':false,'inputs':[{'indexed':false,'name':'questionAddr','type':'address'}],'name':'QuestionAdded','type':'event'},{'anonymous':false,'inputs':[],'name':'BountyIncreased','type':'event'},{'anonymous':false,'inputs':[],'name':'BountyPaid','type':'event'}];
   private ABI  = [{}]
   intializeWeb3(privateKeyInput, addressInput): void {
       this.nodeIP = 'MetaMask';//localStorage['nodeIP'] || this.defaultNodeIP;
      // this.web3 = new Web3(this.web3.currentProvider);
       this.privateKey=privateKeyInput;
       this.address=addressInput;
       this.connectToNode(); // Connect to whatever's available

   }

   weiToEth(wei: number): number {
       return parseFloat(this.web3.fromWei(wei, 'ether'));
   }

   connected(): Promise<any> {
       let p = new Promise<any>((resolve, reject) => {


           if (this.nodeIP !== 'MetaMask') {


               this.web3.eth.sendTransaction({from: this.web3.eth.defaultAccount, to: this.web3.eth.defaultAccount, value: 0, gas: 0, gasPrice: 0 },
            //this.web3.eth.sendTransaction({from: this.web3.eth.accounts[0], to: this.web3.eth.accounts[0], value: 0, gas: 0, gasPrice: 0 },
                   (err, res) => {;
                       if (err.toString() !== 'Error: account is locked') {
                           this.unlockedAccount = this.web3.eth.accounts[0];
                           this.update.emit(null);
                           console.log('Connected to account: ' + this.unlockedAccount);
                           resolve(true);
                       } else {
                           console.log('Error: Could not find an unlocked account: ',err);
                           resolve(false);
                       }
                   }
               );
           } else {
               this.unlockedAccount = this.web3.eth.accounts[0];
               console.log('Connected to account: ' + this.unlockedAccount)
               resolve(false);
           }
       });
       return p;
   }

   handleConnection(connect: boolean): void {
       if (connect) {
           this.connected();
       } else {
           this.nodeIP = this.defaultNodeIP;
           this.connectToNode();
       }
       this.nodeConnected = connect;
   }

   connectToNode(): void { // Don't unlock until you send a transaction
      console.log('connecting: ',window['web3'])
      console.log('connecting: ',localStorage['nodeIP'])

       if (typeof window['web3'] !== 'undefined' && (!localStorage['nodeIP'] || this.nodeIP === 'MetaMask')) {
           localStorage['nodeIP'] = this.nodeIP;
           console.log('Using injected web3');
           this.web3 = new this.Web3(window['web3'].currentProvider);
           this.nodeIP = 'MetaMask';
           this.nodeConnected = true;
           this.unlockedAccount = 'MetaMask';
           this.update.emit(null);
           this.handleConnection(this.web3.isConnected());

       } else {
           localStorage['nodeIP'] = this.nodeIP;
           console.log('Using HTTP node;', this.nodeIP);
           this.unlockedAccount = undefined;
           this.web3 = new this.Web3(new this.Web3.providers.HttpProvider(this.nodeIP));
           this.handleConnection(this.web3.isConnected());
       }
   }


   get isConnected(): boolean {
       return this.nodeConnected;
   }

   get web3(): any {
       if (!this.web3Instance) {
           this.intializeWeb3(this.privateKey,this.address);
       }
       return this.web3Instance;
   }
   set web3(web3: any) {
       this.web3Instance = web3;
   }

   get currentAcc(): string {
       return this.unlockedAccount;
   }
   get currentAddr(): string {
       return this.contractAddr;
   }
   set currentAddr(contractAddr: string) {
       if (contractAddr.length === 42 || contractAddr.length === 40) {
           this.contractAddr = contractAddr;
       } else {
           console.log('Invalid address used');
       }
   }
   get currentNode(): string {
       return this.nodeIP;
   }
   set currentNode(nodeIP: string) {
       this.nodeIP = nodeIP;
   }

   get Web3(): any {
       return window['Web3'];
   }

   get addingQuestion(): boolean {
       return this.adding;
   }

}
