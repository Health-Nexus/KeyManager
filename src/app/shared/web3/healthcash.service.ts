import { Injectable, EventEmitter, Output } from '@angular/core';
import { Http, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// const Web3 = require('web3');
import 'rxjs/add/operator/map';

/**
 * Class to handle HLTH Cash Contract interactions
 */
@Injectable()
export class HealthcashService {
  @Output() update = new EventEmitter();
   private rinkebyContractAddr: string = '0xE119fED04c8C51a489d20AED5B4145E717cB4De7'
   private mainContractAddr: string = ''
   private contractAddr: string;
   private rinkebyDrsAddr: string = '0x2c104bb9E7098Ccc5a537caF2daE52caC4E4e5B5'
   private mainDrsAddr: string = ''
   private drsAddr: string;
   private defaultNodeIP: string = 'MetaMask';                    // Default node
   private nodeIP: string;                                                      // Current nodeIP
   private nodeConnected: boolean = true;                                       // If we've established a connection yet
   private web3Instance: any;                                                   // Current instance of web3
   private unlockedAccount: string;
   private contract: any;
   private _contract: any;
   private balance = new BehaviorSubject<number>(0);
   private canspend = new BehaviorSubject<number>(0);
   currentBalance = this.balance.asObservable();
   allowedToSpend = this.canspend.asObservable();


   /**
    * Constructor function.  Initializes array and calls on init
    * @param Http http
    */
       constructor(private http: Http) {
         this.ngOnInit();
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

       /**
        * ngOnInit function.  Loads all initial data needed
        *
        */
       ngOnInit() {
         let p = new Promise<any>((resolve, reject) => {
           this.http.get("./data/HealthCash.json")
            .map(response => response.json() )
            .subscribe(result => {
              this.contract=result;
              this._contract=this.web3.eth.contract(this.contract.abi)
              this.balanceOf();
              this.drsApprovedFor();
              resolve(result);
            });
          });
      }

      /**
       * initializeWeb3 function.  Initializes web3
       *
       */
   initializeWeb3(): void {
     this.ngOnInit();
       this.nodeIP = 'MetaMask';
       this.connectToNode(); // Connect to whatever's available
   }

   /**
    * setTransferAgent function.  sets future transfer agent
    *
    */
   setTransferAgent(): any {
       this._contract=this.web3.eth.contract(this.contract.abi)
         let p = new Promise<any>((resolve, reject) => {
           this._contract.at(this.contractAddr).setTransferAgent('0x1ba6cea196f186e6ee2d8ac46308e6d18018e910',true,(error, result) => {
             if (!error) {
               resolve(result);
             } else {
               console.log('error from transfer agent:',error)
               reject(error)   }
             });

           });
           return p;
   }

   /**
    * approve function. approves users hlth to be used by DRS to set amount
    * @param amount:  amount to approve for
    */
   approve(amount): any {
         let p = new Promise<any>((resolve, reject) => {
           this._contract.at(this.contractAddr).approve(this.drsAddr,amount,(error, result) => {
             if (!error) {
               resolve(result);
             } else {
               console.log('error from transfer agent:',error)
               reject(error)   }
             });
           });
           return p;
   }


   /**
    * transfer function.  Transfers value to address in hlth
    * @param _to:  address to transfer to
    * @param _value:  amount to transfer for
    */
   transfer( _to,  _value): any {
       this._contract=this.web3.eth.contract(this.contract.abi)
         let p = new Promise<any>((resolve, reject) => {
           this._contract.at(this.contractAddr).transfer(_to,_value,(error, result) => {
             if (!error) {
               resolve(result);
             } else {
               console.log('error from transfer:',error)
               reject(error)   }
             });

           });
           return p;
   }

   /**
    * drsApprovedFor function. Retrieves how much user is approved for
    * @param amount:  amount to approve for
    * @return {int} amount user is approved for
    */
   drsApprovedFor(): any {
     if (!this.unlockedAccount) {
       return;
     }
    let p = new Promise<any>((resolve, reject) => {
          this._contract.at(this.contractAddr)
          .allowance(this.unlockedAccount,
                     this.drsAddr,
                     (error, result) => {
            if (!error) {
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

  /**
   * balanceOf function. Retrieves Hlth balance
   * @param amount:  amount to approve for
   * @return {int} Hlth Balance
   */
   balanceOf(): any {
     if (!this.unlockedAccount) {
       return;
     }
       this._contract=this.web3.eth.contract(this.contract.abi)
         let p = new Promise<any>((resolve, reject) => {
           this._contract.at(this.contractAddr).balanceOf(this.unlockedAccount, (error, result) => {
             if (!error) {
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

   /**
    * transferOwnership function. transfers ownership of contract if owner to addr
    * @param addr: address to transfer ownership to
    */
   transferOwnership(addr): any {
       this._contract=this.web3.eth.contract(this.contract.abi)
         let p = new Promise<any>((resolve, reject) => {
           this._contract.at(this.contractAddr).transferOwnership(addr,(error, result) => {
             if (!error) {
               resolve(result);
             } else {
               console.log('error transfer ownership:',error)
               reject(error)   }
             });

           });
           return p;
   }

   /**
    * transferFrom function. transfers HLTH from one address to another
    * @param _from: address to transfer from
    * @param _to: address to transferto
    * @param _value: amount to transfer
    */
   transferFrom( _from, _to,  _value): any {

       this._contract=this.web3.eth.contract(this.contract.abi)
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

   /**
    * weiToEth function. any key or service can log
    * @param wei:  amount to convert
    * @return {number} converted wei to Eth
    */
   weiToEth(wei: number): number {
       return parseFloat(this.web3.fromWei(wei, 'ether'));
   }

   /**
    * connected function. tests connection
    *
    *
    */
   connected(): Promise<any> {
       let p = new Promise<any>((resolve, reject) => {


           if (this.nodeIP !== 'MetaMask') {


               this.web3.eth.sendTransaction({from: this.web3.eth.defaultAccount, to: this.web3.eth.defaultAccount, value: 0, gas: 0, gasPrice: 0 },
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

   /**
    * handleConnection function.
    * @param connect:
    *
    */
   handleConnection(connect: boolean): void {
       if (connect) {
           this.connected();
       } else {
           this.nodeIP = this.defaultNodeIP;
           this.connectToNode();
       }
       this.nodeConnected = connect;
   }

   /**
    * connectToNode function:  Connects to a node
    *
    */
   connectToNode(): void { // Don't unlock until you send a transaction

       if (typeof window['web3'] !== 'undefined' && (!localStorage['nodeIP'] || this.nodeIP === 'MetaMask')) {
           localStorage['nodeIP'] = this.nodeIP;
           this.web3 = new this.Web3(window['web3'].currentProvider);
           this.nodeIP = 'MetaMask';
           this.nodeConnected = true;
           this.unlockedAccount = 'MetaMask';
           this.update.emit(null);
           this.handleConnection(this.web3.isConnected());

       } else {
           localStorage['nodeIP'] = this.nodeIP;
           this.unlockedAccount = undefined;
           this.web3 = new this.Web3(new this.Web3.providers.HttpProvider(this.nodeIP));
           this.handleConnection(this.web3.isConnected());
       }
   }

   /**
    * isConnected function:  checks connection status
    *
    */
   get isConnected(): boolean {
       return this.nodeConnected;
   }

   /**
    * web3 function:  starts and gets web3
    *
    */
   get web3(): any {
       if (!this.web3Instance) {
           this.initializeWeb3();
       }
       return this.web3Instance;
   }

   /**
    * web3 function:  sets web3
    *
    */
   set web3(web3: any) {
       this.web3Instance = web3;
   }

   /**
    * currentAcc function: gets current account
    *
    */
   get currentAcc(): string {
       return this.unlockedAccount;
   }

   /**
    * currentAddr function: gets current address
    *
    */
   get currentAddr(): string {
       return this.contractAddr;
   }

   /**
    * currentAddr function: sets current address
    *
    */
   set currentAddr(contractAddr: string) {
       if (contractAddr.length === 42 || contractAddr.length === 40) {
           this.contractAddr = contractAddr;
       } else {
           console.log('Invalid address used');
       }
   }
   /**
   * currentNode function: gets current node
   *
   */
   get currentNode(): string {
       return this.nodeIP;
   }

   /**
    * currentAddr function: sets current node
    *
    */
   set currentNode(nodeIP: string) {
       this.nodeIP = nodeIP;
   }

   /**
    * Web3 function: retunrs web3 in the window
    *
    */
   get Web3(): any {
       return window['Web3'];
   }


}
