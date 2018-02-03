import { Injectable, EventEmitter, Output } from '@angular/core';
import { Http, Response } from '@angular/http';
// const Web3 = require('web3');
import 'rxjs/add/operator/map';

@Injectable()
export class Web3Service {

  @Output() update = new EventEmitter();
   private contractAddr: string = '0x1ba6cea196f186e6ee2d8ac46308e6d18018e910'// Current address 
   private defaultNodeIP: string = 'MetaMask';                    // Default node
   private nodeIP: string;                                                      // Current nodeIP
   private nodeConnected: boolean = true;                                       // If we've established a connection yet
   private adding: boolean = false;                                             // If we're adding a question
   private web3Instance: any;                                                   // Current instance of web3
   private unlockedAccount: string;
   private addr: string;
   private privateKey: string;
   private address: string;
   private abi:any = [ {} ]; // redacted on purpose
   private abiArray:any = this.abi;
   private contract: any;
   private _contract: any;
         // Current unlocked account
   // Application Binary Interface so we can use the question contract
   //private ABI  = [{'constant':false,'inputs':[{'name':'queryID','type':'bytes32'},{'name':'result','type':'string'}],'name':'__callback','outputs':[],'type':'function'},{'constant':true,'inputs':[{'name':'','type':'uint256'}],'name':'questions','outputs':[{'name':'contractAddress','type':'address'},{'name':'site','type':'string'},{'name':'questionID','type':'uint256'},{'name':'winnerAddress','type':'address'},{'name':'winnerID','type':'uint256'},{'name':'acceptedAnswerID','type':'uint256'},{'name':'updateDelay','type':'uint256'},{'name':'expiryDate','type':'uint256'},{'name':'ownedFee','type':'uint256'}],'type':'function'},{'constant':false,'inputs':[],'name':'kill','outputs':[],'type':'function'},{'constant':true,'inputs':[{'name':'_i','type':'uint256'},{'name':'_sponsorAddr','type':'address'}],'name':'getSponsorBalance','outputs':[{'name':'sponsorBalance','type':'uint256'}],'type':'function'},{'constant':false,'inputs':[{'name':'_questionID','type':'uint256'},{'name':'_site','type':'string'}],'name':'handleQuestion','outputs':[],'type':'function'},{'constant':false,'inputs':[{'name':'_i','type':'uint256'}],'name':'increaseBounty','outputs':[],'type':'function'},{'constant':true,'inputs':[],'name':'contractBalance','outputs':[{'name':'','type':'uint256'}],'type':'function'},{'constant':true,'inputs':[{'name':'_questionID','type':'uint256'},{'name':'_site','type':'string'}],'name':'getAddressOfQuestion','outputs':[{'name':'questionAddr','type':'address'}],'type':'function'},{'constant':true,'inputs':[{'name':'_i','type':'uint256'}],'name':'getSponsors','outputs':[{'name':'sponsorList','type':'address[]'}],'type':'function'},{'inputs':[],'type':'constructor'},{'anonymous':false,'inputs':[{'indexed':false,'name':'questionAddr','type':'address'}],'name':'QuestionAdded','type':'event'},{'anonymous':false,'inputs':[],'name':'BountyIncreased','type':'event'},{'anonymous':false,'inputs':[],'name':'BountyPaid','type':'event'}];


       constructor(private http: Http) {
         this.ngOnInit();
       }

       ngOnInit() {
         this.contract = this.http.get("./data/HealthDRS.json")
            .map(response => response.json() )
            .subscribe(result =>{
              this.contract=result;
              this._contract=this.web3.eth.contract(this.contract.abi)
              console.log('abi2: ',result);
              this.web3.eth.filter("pending").watch(
                function(error,result){
                  if (!error) {
            console.log('pending: ',result);
            }
          }
        )
        console.log('here23')
        let serviceEvent = this.web3.eth.contract(this.contract.abi).at('contractAddr').ServiceCreated({}, {fromBlock: 0, toBlock: 'latest'},(err, event) => {
  console.log(err, event)
})
        serviceEvent.get((error, logs) => {
          // we have the logs, now print them
          logs.forEach(log => console.log('log: ',log.args))
        })
        this._contract=this.web3.eth.contract(this.contract.abi)//.at('0xbfBBd01Ae2eA4BFc777F6ea3A2Ad4843c7a104FB').authorizedToSpend((error, result) => {

        console.log('service: ',serviceEvent)
        console.log('contract foundB: ',this._contract.at('contractAddr'))
        this._contract.at('contractAddr').serviceList(3,(error, eventResult) => {
           if (error)
             console.log('3Error in myEvent event handler: ' + error);
           else
             console.log('3myEvent: ' + eventResult);
         })

            });


                        }



   intializeWeb3(privateKeyInput, addressInput): void {
     console.log('ABI: ', this.contract);
       this.nodeIP = 'MetaMask';//localStorage['nodeIP'] || this.defaultNodeIP;
      // this.web3 = new Web3(this.web3.currentProvider);
       this.privateKey=privateKeyInput;
       this.address=addressInput;
       this.connectToNode(); // Connect to whatever's available
   }

   test(): any {
    // let p = new Promise<any>((resolve, reject) => {
    console.log('abi3: ', this.contract)
       this._contract=this.web3.eth.contract(this.contract.abi)//.at('0xbfBBd01Ae2eA4BFc777F6ea3A2Ad4843c7a104FB').authorizedToSpend((error, result) => {
         console.log('contract found: ',this._contract)
         let p = new Promise<any>((resolve, reject) => {
           this._contract.at('contractAddr').authorizedToSpend((error, result) => {
             if (!error) {
               console.log('result contract test1:', result)
               resolve(result);
             } else {
               console.log('error from test1:',error)
               reject(error)   }
             });

           });
           return p;
   }


   createservice(): any {
    // let p = new Promise<any>((resolve, reject) => {
    console.log('abi: ', this.contract)
    console.log('abi type: ',typeof this.contract.abi)
       this._contract=this.web3.eth.contract(this.contract.abi)//.at('0xbfBBd01Ae2eA4BFc777F6ea3A2Ad4843c7a104FB').authorizedToSpend((error, result) => {
         console.log('contract found: ',this._contract)
         let p = new Promise<any>((resolve, reject) => {
           this._contract.at('contractAddr').createService('www.test12.com',(error, result) => {
             if (!error) {
               console.log('result contract test2:', result)
               console.log(typeof result);
               let result2=this.web3.toAscii(result)
               console.log('result contract test2:', result2)
              //  this.web3.eth.contract(this.contract.abi).at('contractAddr').ServiceCreated({}, { fromBlock: 0, toBlock: 'latest' }).get((error, eventResult) => {
              //    if (error)
              //      console.log('2Error in myEvent event handler: ' + error);
              //    else
              //      console.log('2myEvent: ' + JSON.stringify(eventResult.args));
              //  });

             } else {
               console.log('error from test2:',error)
               reject(error)   }
             });

           });
           return p;
   }


   getServiceCount(): any {
    // let p = new Promise<any>((resolve, reject) => {
    console.log('abi: ', this.contract)
       this._contract=this.web3.eth.contract(this.contract.abi)//.at('0xbfBBd01Ae2eA4BFc777F6ea3A2Ad4843c7a104FB').authorizedToSpend((error, result) => {
         console.log('contract found: ',this._contract)
         let p = new Promise<any>((resolve, reject) => {
           this._contract.at('contractAddr').getServiceCount((error, result) => {
             if (!error) {
               console.log('result contract test3:', result)
               resolve(result);
             } else {
               console.log('error from test3:',error)
               reject(error) ;  }
             });

           });
           return p;
   }

   getServiceIds(index): any {
     let p = new Promise<any>((resolve, reject) => {
        this._contract.at('contractAddr').serviceList(index,(error, result) => {
          if (!error) {
            console.log('result contract test4:', result)
            resolve(result);
          } else {
            console.log(error)
            reject(error)
          }
          });
        })
          return p;


   }

   getServiceURL(id): any {
     let p = new Promise<any>((resolve, reject) => {
       this._contract.at('contractAddr').getUrl(id,(error, result) => {
         if (!error) {
           console.log('result contract test4:', result)
           resolve(result);
         } else {
           console.log('error from test4:',error)
           reject(error)
         }
       });
     })
    return p;

   }


   isServiceOwner(id): any {
     let p = new Promise<any>((resolve, reject) => {
       this._contract.at('contractAddr').isServiceOwner(id,this.unlockedAccount,(error, result) => {
         if (!error) {
           console.log(result)
         } else {
           console.log(error)
         }
        });
      })
     return p;
   }


   shareService(id,account): any {
     let p = new Promise<any>((resolve, reject) => {
       this._contract.at('contractAddr').shareService(id,account,(error, result) => {
         if (!error) {
           console.log(result)
         } else {
           console.log(error)
         }
        });
      })
     return p;
   }


   unshareService(id,account): any {
     let p = new Promise<any>((resolve, reject) => {
       this._contract.at('contractAddr').unshareService(id,account,(error, result) => {
         if (!error) {
           console.log(result)
         } else {
           console.log(error)
         }
        });
      })
     return p;
   }


   updateURL(id,url): any {
     let p = new Promise<any>((resolve, reject) => {
       this._contract.at('contractAddr').updateUrl(id,url,(error, result) => {
         if (!error) {
           console.log(result)
         } else {
           console.log(error)
         }
        });
      })
     return p;
   }


   createKey(id): any {
     let p = new Promise<any>((resolve, reject) => {
       this._contract.at('contractAddr').createKey(id,(error, result) => {
         if (!error) {
           console.log(result)
         } else {
           console.log(error)
         }
        });
      })
     return p;
   }

   issueKey(id,address): any {
     let p = new Promise<any>((resolve, reject) => {
       this._contract.at('contractAddr').issueKey(id,address,(error, result) => {
         if (!error) {
           console.log(result)
         } else {
           console.log(error)
         }
        });
      })
     return p;
   }


   permissionKey(id,canShare,canTrade,canSell): any {
     let p = new Promise<any>((resolve, reject) => {
       this._contract.at('contractAddr').setKeyPermissions(id,canShare,canTrade,canSell,(error, result) => {
         if (!error) {
           console.log(result)
         } else {
           console.log(error)
         }
        });
      })
     return p;
   }


   shareKey(key,account): any {
     let p = new Promise<any>((resolve, reject) => {
       this._contract.at('contractAddr').shareKey(key,account,(error, result) => {
         if (!error) {
           console.log(result)
         } else {
           console.log(error)
         }
        });
      })
     return p;
   }


   unshareKey(key,account): any {
     let p = new Promise<any>((resolve, reject) => {
       this._contract.at('contractAddr').unshareKey(key,account,(error, result) => {
         if (!error) {
           console.log(result)
         } else {
           console.log(error)
         }
        });
      })
     return p;
   }


   createSalesOffer(key,buyer,price,canSell): any {
     let p = new Promise<any>((resolve, reject) => {
       this._contract.at('contractAddr').createSalesOffer(key,buyer,price,canSell,(error, result) => {
         if (!error) {
           console.log(result)
         } else {
           console.log(error)
         }
        });
      })
     return p;
   }


   cancelSalesOffer(key): any {
     let p = new Promise<any>((resolve, reject) => {
       this._contract.at('contractAddr').cancelSalesOffer(key,(error, result) => {
         if (!error) {
           console.log(result)
         } else {
           console.log(error)
         }
        });
      })
     return p;
   }


   purchaseKey(key, value): any {
     let p = new Promise<any>((resolve, reject) => {
       this._contract.at('contractAddr').purchaseKey(key, value,(error, result) => {
         if (!error) {
           console.log(result)
         } else {
           console.log(error)
         }
        });
      })
     return p;
   }


   tradeKey(key1, key2): any {
     let p = new Promise<any>((resolve, reject) => {
       this._contract.at('contractAddr').tradeKey(key1, key2,(error, result) => {
         if (!error) {
           console.log(result)
         } else {
           console.log(error)
         }
        });
      })
     return p;
   }


   setKeyData(key, dataKey, dataValue): any {
     let p = new Promise<any>((resolve, reject) => {
       this._contract.at('contractAddr').setKeyData(key, dataKey, dataValue,(error, result) => {
         if (!error) {
           console.log(result)
         } else {
           console.log(error)
         }
        });
      })
     return p;
   }


   getKeyData(key, dataKey): any {
     let p = new Promise<any>((resolve, reject) => {
       this._contract.at('contractAddr').getKeyData(key, dataKey,(error, result) => {
         if (!error) {
           console.log(result)
         } else {
           console.log(error)
         }
        });
      })
     return p;
   }


   getUrlFromKey(key): any {
     let p = new Promise<any>((resolve, reject) => {
       this._contract.at('contractAddr').getUrlFromKey(key,(error, result) => {
         if (!error) {
           console.log(result)
         } else {
           console.log(error)
         }
        });
      })
     return p;
   }


   logAccess(key, data): any {
     let p = new Promise<any>((resolve, reject) => {
       this._contract.at('contractAddr').logAccess(key, data,(error, result) => {
         if (!error) {
           console.log(result)
         } else {
           console.log(error)
         }
        });
      })
     return p;
   }


   message(from, to, category, data): any {
     let p = new Promise<any>((resolve, reject) => {
       this._contract.at('contractAddr').message(from, to, category, data,(error, result) => {
         if (!error) {
           console.log(result)
         } else {
           console.log(error)
         }
        });
      })
     return p;
   }


   log(from,data): any {
     let p = new Promise<any>((resolve, reject) => {
       this._contract.at('contractAddr').log(from,data,(error, result) => {
         if (!error) {
           console.log(result)
         } else {
           console.log(error)
         }
        });
      })
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
