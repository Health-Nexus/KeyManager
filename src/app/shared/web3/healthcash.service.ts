import { Injectable, EventEmitter, Output } from '@angular/core';
import { Http, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// const Web3 = require('web3');
import 'rxjs/add/operator/map';

@Injectable()
export class HealthcashService {
  @Output() update = new EventEmitter();
   private rinkebyContractAddr: string = '0xAB6cee678340A12ee72d41D472300f6A2befA1EB'
   private mainContractAddr: string = ''
   private contractAddr: string;
   private rinkebyDrsAddr: string = '0x1ba6cea196f186e6ee2d8ac46308e6d18018e910'
   private mainDrsAddr: string = ''
   private drsAddr: string;
   private defaultNodeIP: string = 'MetaMask';                    // Default node
   private nodeIP: string;                                                      // Current nodeIP
   private nodeConnected: boolean = true;                                       // If we've established a connection yet
   private adding: boolean = false;                                             // If we're adding a question
   private web3Instance: any;                                                   // Current instance of web3
   private unlockedAccount: string;
   private addr: string;
   private abi:any = [ {} ]; // redacted on purpose
   private abiArray:any = this.abi;
   private contract: any;
   private _contract: any;
   private balance = new BehaviorSubject<number>(0);
   private canspend = new BehaviorSubject<number>(0);
   currentBalance = this.balance.asObservable();
   allowedToSpend = this.canspend.asObservable();

         // Current unlocked account
   // Application Binary Interface so we can use the question contract
   //private ABI  = [{'constant':false,'inputs':[{'name':'queryID','type':'bytes32'},{'name':'result','type':'string'}],'name':'__callback','outputs':[],'type':'function'},{'constant':true,'inputs':[{'name':'','type':'uint256'}],'name':'questions','outputs':[{'name':'contractAddress','type':'address'},{'name':'site','type':'string'},{'name':'questionID','type':'uint256'},{'name':'winnerAddress','type':'address'},{'name':'winnerID','type':'uint256'},{'name':'acceptedAnswerID','type':'uint256'},{'name':'updateDelay','type':'uint256'},{'name':'expiryDate','type':'uint256'},{'name':'ownedFee','type':'uint256'}],'type':'function'},{'constant':false,'inputs':[],'name':'kill','outputs':[],'type':'function'},{'constant':true,'inputs':[{'name':'_i','type':'uint256'},{'name':'_sponsorAddr','type':'address'}],'name':'getSponsorBalance','outputs':[{'name':'sponsorBalance','type':'uint256'}],'type':'function'},{'constant':false,'inputs':[{'name':'_questionID','type':'uint256'},{'name':'_site','type':'string'}],'name':'handleQuestion','outputs':[],'type':'function'},{'constant':false,'inputs':[{'name':'_i','type':'uint256'}],'name':'increaseBounty','outputs':[],'type':'function'},{'constant':true,'inputs':[],'name':'contractBalance','outputs':[{'name':'','type':'uint256'}],'type':'function'},{'constant':true,'inputs':[{'name':'_questionID','type':'uint256'},{'name':'_site','type':'string'}],'name':'getAddressOfQuestion','outputs':[{'name':'questionAddr','type':'address'}],'type':'function'},{'constant':true,'inputs':[{'name':'_i','type':'uint256'}],'name':'getSponsors','outputs':[{'name':'sponsorList','type':'address[]'}],'type':'function'},{'inputs':[],'type':'constructor'},{'anonymous':false,'inputs':[{'indexed':false,'name':'questionAddr','type':'address'}],'name':'QuestionAdded','type':'event'},{'anonymous':false,'inputs':[],'name':'BountyIncreased','type':'event'},{'anonymous':false,'inputs':[],'name':'BountyPaid','type':'event'}];


       constructor(private http: Http) {
         this.ngOnInit();
         console.log('constructor', this.balance)
         //set our addresses based on the network
         switch(this.web3.version.network) {
          case '1':
            this.contractAddr = this.mainContractAddr;
            this.drsAddr = this.mainDrsAddr;
            break;
          default:
            this.contractAddr = this.rinkebyContractAddr;
            this.drsAddr = this.rinkebyDrsAddr;
        }
       }

       ngOnInit() {

         let p = new Promise<any>((resolve, reject) => {
           this.http.get("./data/HealthCash.json")
            .map(response => response.json() )
            .subscribe(result =>{
              this.contract=result;
              this._contract=this.web3.eth.contract(this.contract.abi)
              console.log('balance of init ')
              this.balanceOf();
              resolve(result);
            });
          });
      }

   initializeWeb3(): void {
     this.ngOnInit();
       this.nodeIP = 'MetaMask';//localStorage['nodeIP'] || this.defaultNodeIP;
       this.connectToNode(); // Connect to whatever's available
   }

   setTransferAgent(): any {
    // let p = new Promise<any>((resolve, reject) => {
       this._contract=this.web3.eth.contract(this.contract.abi)//.at('0xbfBBd01Ae2eA4BFc777F6ea3A2Ad4843c7a104FB').authorizedToSpend((error, result) => {
         let p = new Promise<any>((resolve, reject) => {
           this._contract.at(this.contractAddr).setTransferAgent('0x1ba6cea196f186e6ee2d8ac46308e6d18018e910',true,(error, result) => {
             if (!error) {
               console.log('result contract transfer agents:', result)
               resolve(result);
             } else {
               console.log('error from transfer agent:',error)
               reject(error)   }
             });

           });
           return p;
   }


   approve(amount): any {
    // let p = new Promise<any>((resolve, reject) => {
       //this._contract=this.web3.eth.contract(this.contract.abi)//.at('0xbfBBd01Ae2eA4BFc777F6ea3A2Ad4843c7a104FB').authorizedToSpend((error, result) => {
         let p = new Promise<any>((resolve, reject) => {
           this._contract.at(this.contractAddr).approve(this.drsAddr,amount,(error, result) => {
             if (!error) {
               console.log('result contract transfer agents:', result)
               resolve(result);
             } else {
               console.log('error from transfer agent:',error)
               reject(error)   }
             });
           });
           return p;
   }



   transfer( _to,  _value): any {

       this._contract=this.web3.eth.contract(this.contract.abi)//.at('0xbfBBd01Ae2eA4BFc777F6ea3A2Ad4843c7a104FB').authorizedToSpend((error, result) => {
         let p = new Promise<any>((resolve, reject) => {
           this._contract.at(this.contractAddr).transfer(_to,_value,(error, result) => {
             if (!error) {
               console.log('result contract test2:', result)
               resolve(result);
             } else {
               console.log('error from test2:',error)
               reject(error)   }
             });

           });
           return p;
   }

   drsApprovedFor(): any {
    console.log('approved for start ')
    console.log('drs account: ', this.drsAddr)
    let p = new Promise<any>((resolve, reject) => {
          this._contract.at(this.contractAddr)
          .allowance(this.unlockedAccount,
                     this.drsAddr,
                     (error, result) => {
            if (!error) {
             console.log(result)
             this.canspend.next(result.c[0])
             this.allowedToSpend=result.c[0]
             resolve(result.c[0]);
            } else {
             console.log('error from allowance:',error)
             reject(error)
            }
            });
          });
    return p;
  }


   balanceOf(): any {
     console.log('balanceof start ')

     console.log('balance account: ', this.unlockedAccount)
       this._contract=this.web3.eth.contract(this.contract.abi)//.at('0xbfBBd01Ae2eA4BFc777F6ea3A2Ad4843c7a104FB').authorizedToSpend((error, result) => {
         console.log('balance contract: ',this._contract)
         let p = new Promise<any>((resolve, reject) => {
           this._contract.at(this.contractAddr).balanceOf(this.unlockedAccount,(error, result) => {
             if (!error) {
              console.log('result contract balance:', result.c[0])
              this.balance.next(result.c[0])
              this.currentBalance=result.c[0]
               resolve(result.c[0]);
             } else {
               console.log('error from balance:',error)
               reject(error)   }
             });

           });
           return p;
   }


   transferOwnership(): any {
       this._contract=this.web3.eth.contract(this.contract.abi)//.at('0xbfBBd01Ae2eA4BFc777F6ea3A2Ad4843c7a104FB').authorizedToSpend((error, result) => {
         let p = new Promise<any>((resolve, reject) => {
           this._contract.at(this.contractAddr).transferOwnership('0xC6EBD9EfB9469555B3785bd09570571c7310bCb3',(error, result) => {
             if (!error) {
               console.log('result contract balance:', result)
               resolve(result);
             } else {
               console.log('error from balance:',error)
               reject(error)   }
             });

           });
           return p;
   }


   transferFrom( _from, _to,  _value): any {

       this._contract=this.web3.eth.contract(this.contract.abi)//.at('0xbfBBd01Ae2eA4BFc777F6ea3A2Ad4843c7a104FB').authorizedToSpend((error, result) => {
         let p = new Promise<any>((resolve, reject) => {
           this._contract.at(this.contractAddr).transferFrom(_from, _to,  _value,(error, result) => {
             if (!error) {
               console.log('result contract test2:', result)
               resolve(result);
             } else {
               console.log('error from test2:',error)
               reject(error)   }
             });

           });
           return p;
   }


   weiToEth(wei: number): number {
       return parseFloat(this.web3.fromWei(wei, 'ether'));
   }




   sendTransaction(): any {
     var data = this.contract.transfer.getData(this.contractAddr, 10000, {from: this.addr});
     var gasPrice = this.web3.eth.gasPrice;
     var gasLimit = 90000;

     var rawTransaction = {
       "from": this.addr,
       "gasPrice": this.web3.toHex(gasPrice),
       "gasLimit": this.web3.toHex(gasLimit),
       "to": this.contractAddr,
       "value": "0",
       "data": data,
    "chainId": ''
  };

  // var tx = new Tx(rawTransaction);
  //
  // tx.sign(privKey);
  // var serializedTx = tx.serialize();

  this.web3.eth.sendTransaction(rawTransaction, function(err, hash) {
    if (!err)
      console.log(hash);
      else
      console.log(err);
    });
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
           this.initializeWeb3();
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
