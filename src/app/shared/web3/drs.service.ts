/**
 * @fileoverview File to interact with Web3
 * @package
 */

import { Injectable, EventEmitter, Output } from '@angular/core';
import { Http, Response,Headers, RequestOptions,URLSearchParams,ResponseContentType } from '@angular/http';
import * as async from 'async';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/map';


/**
 * Class to handle DRS Contract interactions
 */
@Injectable()
export class DrsService {

  @Output() update = new EventEmitter();
   private mainContractAddr: string = '' //Main net
   private contractAddr: string = '0xF54a6dE3F1FE973c73BfBb9a5B35D3695Ea277D2'// Rinkeby Default
   private defaultNodeIP: string = 'MetaMask';                    // Default node
   private nodeIP: string;                                                      // Current nodeIP
   private nodeConnected: boolean = true;                                       // If we've established a connection yet
  //  private adding: boolean = false;                                             // If we're adding a question
   private web3Instance: any;                                                   // Current instance of web3
   private unlockedAccount: string;
   private contract: any;
   private _contract: any;
   private services: Array<{}>;
   private keys: Array<{}>;
   private keysData: Array<{}>;
   private keyOwners:any;
   private keyNumber:number;
   private keyAccess:any;

   private selectedParentKey = new Subject<string>();
   private selectedChildKey = new Subject<string>();
   private authorized = new BehaviorSubject<boolean>(false);
   private loaded = new BehaviorSubject<boolean>(false);

   parentKeyChanged$ = this.selectedParentKey.asObservable();
   childKeyChanged$ = this.selectedChildKey.asObservable();
   loginChanged$ = this.authorized.asObservable();
   onLoad$ = this.loaded.asObservable();


   /**
    * Constructor function.  Initializes array and calls on init
    * @param Http http
    */
       constructor(private http: Http) {

         this.services=[];
         this.keys=[];
         this.keysData=[];
         this.keyOwners={};
         this.keyAccess={};

         this.ngOnInit();
       }

       /**
        * ngOnInit function.  Loads all initial data needed
        *
        */
    ngOnInit() {
      var self = this;
      this.contract = this.http.get("./data/HealthDRS.json")
      .map(response => response.json() )
      .subscribe(result => {
        this.contract = result;
        this._contract = this.web3.eth.contract(this.contract.abi);

        if ( this.web3.version.network == 1 ) {
          //User Main net contract Address
          this.contractAddr = this.mainContractAddr;
        }
        if (this.unlockedAccount) { // loaded with MetaMask
          this.loadKeysAndServices();
        }

        new Promise<any>((resolve, reject) => {
          this._contract.at(this.contractAddr).getKeyCount((error, result) => {
            if (!error) {
              this.keyNumber = result.c[0];
              // resolve(result);
            } else {
              console.log('error from key count:',error);
              // reject(error)
            }
          });
        });
      });
    }

    loadKeysAndServices() {
      var self = this;

      async.parallel([
        function loadServices(next) {
          //gets a list of services
          let serviceEvent = self.web3.eth.contract(self.contract.abi).at(self.contractAddr).ServiceCreated({}, {fromBlock: 1649845, toBlock: 'latest'},(err, event) => {
            // console.log(err, event)
          })

          serviceEvent.get((error, results) => {
            // we have the results, now print them
            async.each(results, function(result, nextResult) {
            let resultArgs = result["args"] || {};
              if (resultArgs._owner == self.unlockedAccount) {
                self.services.push(resultArgs);
              }
              nextResult();
            }, next);
          })
        },
        function loadKeys(next) {
          let keyEvent = self.web3.eth.contract(self.contract.abi).at(self.contractAddr).KeyCreated({}, {fromBlock: 0, toBlock: 'latest'},(err, event) => {
            //console.log(err, event)
          })
          keyEvent.get((error, results) => {
            // we have the results, now print them
            async.each(results, function(result, nextResult) {
            let args = result && result["args"] || {};
             async.series([
               function getOwners(done) {
                 self.getKeyOwners(args._key,0,[]).then(function(result) {
                   self.keyOwners[args._key] = result;
                   done();
                 });
               },
               function getInfo(done) {
                 if (args._owner == self.unlockedAccount) {
                     self.getKeyInfo(args._key).then(function(info) {
                     self.keys.push({
                       key: args._key,
                       owner: args._owner,
                       share: info[1],
                       trade: info[2],
                       sell: info[3],
                       service: info[4]
                     });
                     self.keysData.push(info);
                     done();
                   });
               } else {
                 //getUrlFromKey
                  self.isKeyOwner(args._key,self.unlockedAccount).then(function(resultOwner) {
                   if (resultOwner) {
                     self.keyAccess[args._key]={'key':args._key};
                     self.getUrlFromKey(args._key).then(function(resultUrl) {
                       self.keyAccess[args._key]['url']=resultUrl;
                       }.bind(self));
                     self.getKeyInfo(args._key).then(function(keyResult) {
                       self.keyAccess[args._key]['share']=keyResult[1];
                       self.keyAccess[args._key]['trade']=keyResult[2];
                       self.keyAccess[args._key]['sell']=keyResult[3];
                       self.keyAccess[args._key]['service']=keyResult[4];
                       });
                     }
                     done();
                   });
               }
               }
             ], nextResult);
           }, next);
          })
        },
        function loadServiceList(next) {
          self._contract=self.web3.eth.contract(self.contract.abi)

          self._contract.at(self.contractAddr).serviceList(3, (error, eventResult) => {
            next();
             if (error){
               console.log('3Error in myEvent event handler: ' + error);

             }
             else{

             }
           });
        }
      ], function(err) {
        self.loaded.next(true);
      })
    }

    changeParentKey(parentKey: string) {
      this.selectedParentKey.next(parentKey);
    }

    changeChildKey(childKey: string) {
      this.selectedChildKey.next(childKey);
    }

    /**
     * dataRequestTest function.  Sends signed message to a gatekeeper, based on key, parameter and key url, to retrive data.
     * @param urlKey:  The data form the key to be treated as a url to call
     * @param parameter:  Pareamter to use in the request
     * @param key:  The id of the key to use to unlock the data
     * @return {json | file} returns Json or a file
     */
     //TODO:  Break into a function for json and a function for sharing
    dataRequestTest(urlKey,parameter,key): any {

      //determines signer and message
      var signature;
      var signer = this.unlockedAccount || this.web3.eth.defaultAccount || this.web3.eth.accounts[0];
      var original_message = "DRS Message";
      var message_hash = this.web3.sha3(
        '\u0019Ethereum Signed Message:\n' +
        original_message.length.toString() +
        original_message
      );
      let p = new Promise<any>((resolve, reject) => {
        this.web3.eth.sign(signer,message_hash, function(err, res) {
          if (err) console.error(err);
          signature = res;
          var headers = new Headers({ 'Content-Type': 'application/octet-stream',
        });
        //      responseType: ResponseContentType.Blob,

          var options = new RequestOptions({ //headers: headers,
            responseType : ResponseContentType.ArrayBuffer

           });
          var url='http://'+urlKey+this.unlockedAccount+'/'+signature+'/'+message_hash+'/'+parameter+'/'+key;
          return this.http.get(url, options)
                    .subscribe(result => {
                      console.log('result: ', result)
                      resolve(result);
                    })
        }.bind(this));
      });

      return p;
  }

  /**
   * updatePhuse function.  Sends signed message to a gatekeeper, based on key, parameter and key url, to retrive data.
   * @param urlKey:  The data form the key to be treated as a url to call
   * @param parameter:  Parameter to use in the request
   * @param key:  The id of the key to use to unlock the data
   * @return {json | file} returns Json or a file
   */
   updatePhuse(urlKey,phuseNumber): any {

    //determines signer and message
    var signature;
    var signer = this.unlockedAccount || this.web3.eth.defaultAccount || this.web3.eth.accounts[0];
    var original_message = "DRS Message";
    var message_hash = this.web3.sha3(
      '\u0019Ethereum Signed Message:\n' +
      original_message.length.toString() +
      original_message
    );
    console.log("UPDATE PHUSE: ",urlKey,phuseNumber)
    let p = new Promise<any>((resolve, reject) => {
      this.web3.eth.sign(signer,message_hash, function(err, res) {
        if (err) console.error(err);
        signature = res;
        var headers = new Headers({ 'Content-Type': 'application/octet-stream',
      });
        var options = new RequestOptions({ //headers: headers,
          responseType : ResponseContentType.ArrayBuffer

         });
        var url='http://'+urlKey+'register/'+this.unlockedAccount+'/'+signature+'/'+message_hash+'/'+phuseNumber;
        return this.http.get(url, options)
                  .subscribe(result => {
                    resolve(result);
                  })
      }.bind(this));
    });

    return p;
  }


  /**
   * updatePhuse function.  Sends signed message to a gatekeeper, based on key, parameter and key url, to retrive data.
   * @param urlKey:  The data form the key to be treated as a url to call
   * @param parameter:  Pareamter to use in the request
   * @param key:  The id of the key to use to unlock the data
   * @return {json | file} returns Json or a file
   */
   uploadFile(file, urlKey): any {

    //determines signer and message
    var signature;
    var signer = this.unlockedAccount || this.web3.eth.defaultAccount || this.web3.eth.accounts[0];
    var original_message = "DRS Message";
    var message_hash = this.web3.sha3(
      '\u0019Ethereum Signed Message:\n' +
      original_message.length.toString() +
      original_message
    );
    console.log("UPDATE PHUSE: ",urlKey)
    let p = new Promise<any>((resolve, reject) => {
      this.web3.eth.sign(signer,message_hash, function(err, res) {
        if (err) console.error(err);
        signature = res;
        var headers = new Headers({ 'Content-Type': 'application/octet-stream',
      });
        var options = new RequestOptions({ //headers: headers,
          responseType : ResponseContentType.ArrayBuffer

         });
        var url='http://'+urlKey+'upload/'+this.unlockedAccount+'/'+signature+'/'+message_hash;

        const formData: FormData = new FormData();
        formData.append('fileKey', file, file.name);
        console.log("HERE", file);
        return this.http.post(url, formData, options)
          .subscribe(result => {
            console.log("RESULT: ",result);
          })
        // return this.http.get(url, options)
        //           .subscribe(result => {
        //             resolve(result);
        //           })
      }.bind(this));
    });

    return p;
  }

  /**
   * initializeWeb3 function.  initalizes web3
   */
   initializeWeb3(): void {
       this.nodeIP = 'MetaMask';
       this.connectToNode(); // Connect to whatever's available
   }

   /**
    * getServices function.  Returns all services on the drs contract
    * @return {Array<json>} returns an array of json obejcts of all the services
    */
   getServices(): any {

     return this.services;
   }

   /**
    * getKeys function.  Returns all keys on the drs contract
    * @return {Array<json>} returns an array of json obejcts of all the keys
    */
   getKeys(): any {
     return this.keys;
   }

   /**
    * getKeys function.  Returns all key owners on the drs contract
    * @return {Array<json>} returns an array of json obejcts of all the keys
    */
   returnKeyOwners(): any {
     return this.keyOwners;
   }


      /**
       * getKeysData function.  Returns all key data on the drs contract
       * @return {Array<json>} returns an array of json obejcts of all the keys
       */
   getKeysData(): any {
     return this.keysData;
   }

   /**
    * getKeysData function.  Returns all keyAccess(owners/sharers) data
    * @return {Array<json>} returns an array of json obejcts of all the keyAccess
    */
   getkeyAccess(): any {
     return this.keyAccess;
   }

   /**
    * authorizedToSpend function.  retrieves how much HLTH a user is allowed to spend
    * @return {jso>} returns an error or success
    */
   authorizedToSpend(): any {
       this._contract=this.web3.eth.contract(this.contract.abi)
         let p = new Promise<any>((resolve, reject) => {
           this._contract.at(this.contractAddr).authorizedToSpend((error, result) => {
             if (!error) {
               resolve(result);
             } else {
                reject(error);
             }
             });

           });
           return p;
   }

   /**
    * createservice function.  creates a service with the given string
    * @param url:  String to be stored with the service, suggested url
    * @return {json} success or error
    */
   createservice(url): any {
       this._contract=this.web3.eth.contract(this.contract.abi)
         let p = new Promise<any>((resolve, reject) => {
           this._contract.at(this.contractAddr).createService(url,(error, result) => {
             if (!error) {

               let result2=this.web3.toAscii(result);
              resolve(result2);

             } else {
               reject(error);
             }
             });

           });
           return p;
   }

   /**
    * getServiceCount function.  Gets a count on the number of services
    * @return {json} error or success.  Success contains number of services
    */
   getServiceCount(): any {
       this._contract=this.web3.eth.contract(this.contract.abi)
         let p = new Promise<any>((resolve, reject) => {
           this._contract.at(this.contractAddr).getServiceCount((error, result) => {
             if (!error) {
               resolve(result);
             } else {
               console.log('error from:',error)
               reject(error);
             }
             });

           });
           return p;
   }

   /**
    * getKeyOwners function.  Retreive array of owners of keys
    * @return {json} error or success.  Success contains an array of key owners
    */
   getKeyOwners(key,index,finalResult): any {

       this._contract=this.web3.eth.contract(this.contract.abi)
         let p = new Promise<any>((resolve, reject) => {
           this._contract.at(this.contractAddr).owners(key,index,(error, result) => {
             if (!error) {
               if(result!='0x'){
                finalResult.push(result)
                resolve(this.getKeyOwners(key,index+1,finalResult));
               }
               else{
                resolve(finalResult);
              }
             } else {
               console.log('error from:',error)
               reject(error);
             }
             });

           });
           return p;
   }

   /**
    * getServiceIds function.  Retreive array of owners of keys
    * @param index:  int index of service to get
    * @return {json} error or success.  Success contains a service object
    */
   getServiceIds(index): any {
     let p = new Promise<any>((resolve, reject) => {
        this._contract.at(this.contractAddr).serviceList(index,(error, result) => {
          if (!error) {
            resolve(result);
          } else {
            console.log(error)
            reject(error);
          }
          });
        })
          return p;


   }

   /**
    * isKeyOwner function.  Determines if user is a key owner of given key
    * @param key:  id of key to check for ownership
    * @param account:  address of user to check for ownership
    * @return {json} error or success.  Success contains a boolean of if its a owner or not
    */
   isKeyOwner(key, account): any {
     let p = new Promise<any>((resolve, reject) => {
        this._contract.at(this.contractAddr).isKeyOwner(key,account,(error, result) => {
          if (!error) {
            resolve(result);
          } else {
            console.log(error)
            reject(error);
          }
          });
        })
          return p;


   }

   /**
    * getServiceURL function.  Retrieves URL for service
    * @param id:  id of service to retrieve url
    * @return {json} error or success.  Success contains a json object with the url
    */
   getServiceURL(id): any {
     let p = new Promise<any>((resolve, reject) => {
       this._contract.at(this.contractAddr).getUrl(id,(error, result) => {
         if (!error) {
           resolve(result);
         } else {
           console.log('error:',error)
           reject(error);
         }
       });
     })
    return p;

   }

   /**
    * isServiceOwner function.  Determines if user is a service owner of given service
    * @param id:  id of service to check for ownership
    * @return {json} error or success.  Success contains a boolean of if its a owner or not
    */
   isServiceOwner(id): any {
     let p = new Promise<any>((resolve, reject) => {
       this._contract.at(this.contractAddr).isServiceOwner(id,this.unlockedAccount,(error, result) => {
         if (!error) {
           resolve(result);
         } else {
           console.log(error)
         }
        });
      })
     return p;
   }

   /**
    * shareService function.  Shares a key with another usere
    * @param id:  id of key to share
    * @param account:  id of acount to share with
    * @return {json} error or success.
    */
   shareService(id,account): any {
     let p = new Promise<any>((resolve, reject) => {
       this._contract.at(this.contractAddr).shareService(id,account,(error, result) => {
         if (!error) {
           resolve(result);
         } else {
           console.log(error)
         }
        });
      })
     return p;
   }

   /**
    * unshareService function. Unshares a given service
    * @param id:  id of service to share
    * @param account:  address of user to share with
    * @return {json} error or success.  Success contains a boolean for successful unsharing
    */
   unshareService(id,account): any {
     let p = new Promise<any>((resolve, reject) => {
       this._contract.at(this.contractAddr).unshareService(id,account,(error, result) => {
         if (!error) {
           resolve(result);
         } else {
           console.log(error)
         }
        });
      })
     return p;
   }

   /**
    * updateURL function. Updates the URL of a given service
    * @param id:  id of service to update
    * @param url:  Url to update to
    * @return {json} error or success.  Success contains a boolean for successful update
    */
   updateURL(id,url): any {
     let p = new Promise<any>((resolve, reject) => {
       this._contract.at(this.contractAddr).updateUrl(id,url,(error, result) => {
         if (!error) {
           resolve(result);
         } else {
           console.log(error)
         }
        });
      })
     return p;
   }

   /**
    * createKey function. Creates a key for the given service for the current user
    * @param id:  id of the service to create a key for
    * @return {json} error or success.  Success contains a boolean for successful create
    */
   createKey(id): any {
     let p = new Promise<any>((resolve, reject) => {
       this._contract.at(this.contractAddr).createKey(id,(error, result) => {
         if (!error) {
           resolve(result);
         } else {
           console.log(error)
         }
        });
      })
     return p;
   }

   /**
    * issueKey function.  Creates a key for the given service for the current user
    * @param id:  id of the service to create a key for
    * @param address:  address of the user
    * @return {json} error or success.  Success contains a boolean for successful create
    */
   issueKey(id,address): any {
     let p = new Promise<any>((resolve, reject) => {
       this._contract.at(this.contractAddr).issueKey(id,address,(error, result) => {
         if (!error) {
           resolve(result);
         } else {
           console.log(error)
         }
        });
      })
     return p;
   }

   /**
    * permissionKey function.  Set permission on key for exchanging
    * @param id:  id of the key to set permissions for
    * @param canShare:  boolean for if the user can share
    * @param canTrade:  boolean for if the user can trade
    * @param canSell:  boolean for if the user can sell
    * @return {json} error or success.
    */
   permissionKey(id,canShare,canTrade,canSell): any {
     let p = new Promise<any>((resolve, reject) => {
       this._contract.at(this.contractAddr).setKeyPermissions(id,canShare,canTrade,canSell,(error, result) => {
         if (!error) {
           resolve(result);
         } else {
           console.log(error)
         }
        });
      })
     return p;
   }

   /**
    * shareKey function.  shares a key with the given account
    * @param key:  id of the key to share
    * @param account:  address of the account to share with
    * @return {json} error or success.
    */
   shareKey(key,account): any {
     let p = new Promise<any>((resolve, reject) => {
       this._contract.at(this.contractAddr).shareKey(key,account,(error, result) => {
         if (!error) {
           resolve(result);
         } else {
           reject(error);

           console.log(error)
         }
        });
      })
     return p;
   }

   /**
    * unshareKey function. Unshares a given key
    * @param id:  id of key to share
    * @param account:  address of user to share with
    * @return {json} error or success.  Success contains a boolean for successful unsharing
    */
   unshareKey(key,account): any {
     let p = new Promise<any>((resolve, reject) => {
       this._contract.at(this.contractAddr).unshareKey(key,account,(error, result) => {
         if (!error) {
           resolve(result);
         } else {
           console.log(error)
         }
        });
      })
     return p;
   }

   /**
    * createSalesOffer function. creates a sales offer for a given key and buyer
    * @param key:  id of key to offer
    * @param buyer:  address of buyer to share with
    * @param price:  amount to sell for
    * @param canSell:  ability to sell
    * @return {json} error or success.  Success contains a boolean for successful create sales offer
    */
   createSalesOffer(key,buyer,price,canSell): any {
     let p = new Promise<any>((resolve, reject) => {
       this._contract.at(this.contractAddr).createSalesOffer(key,buyer,price,canSell,(error, result) => {
         if (!error) {
           resolve(result);
         } else {
           reject(error);
           console.log(error)
         }
        });
      })
     return p;
   }

   /**
    * cancelSalesOffer function. cancels all sales offers for a given key
    * @param key:  id of key to cancel all offers for
    * @return {json} error or success.  Success contains a boolean for successful cancel
    */
   cancelSalesOffer(key): any {
     let p = new Promise<any>((resolve, reject) => {
       this._contract.at(this.contractAddr).cancelSalesOffer(key,(error, result) => {
         if (!error) {
           resolve(result);
         } else {
           reject(error);
           console.log(error)
         }
        });
      })
     return p;
   }

   /**
    * purchaseKey function. Purchase a key with an outstanding offer
    * @param key:  id of key to purchase
    * @return {json} error or success.  Success contains a boolean for successful unsharing
    */
   purchaseKey(key): any {
     let p = new Promise<any>((resolve, reject) => {
       this._contract.at(this.contractAddr).purchaseKey(key,(error, result) => {
         if (!error) {
           resolve(result);
         } else {
           reject(error);

           console.log(error)
         }
        });
      })
     return p;
   }

   /**
    * tradeKey function. trades a key with a second key if there is a pending offer
    * @param key1:  id of key1 to trade
    * @param key2:  id of key2 to trade
    * @return {json} error or success.  Success contains a boolean for successful trade
    */
   tradeKey(key1, key2): any {
     let p = new Promise<any>((resolve, reject) => {
       this._contract.at(this.contractAddr).tradeKey(key1, key2,(error, result) => {
         if (!error) {
           resolve(result);
         } else {
           reject(error);

           console.log(error)
         }
        });
      })
     return p;
   }

   /**
    * CreateTradeKeyOffer function. creates a trade offer for a key and a second key
    * @param key1:  id of key1 to trade
    * @param key2:  id of key2 to trade
    * @return {json} error or success.  Success contains a boolean for successful trade offer
    */
   CreateTradeKeyOffer(key1, key2): any {
     let p = new Promise<any>((resolve, reject) => {
       this._contract.at(this.contractAddr).createTradeOffer(key1, key2,(error, result) => {
         if (!error) {
           resolve(result);
         } else {
           reject(error);

           console.log(error)
         }
        });
      })
     return p;
   }

   /**
    * cancelTradeKey function. cancels all trade offers for a given key
    * @param key:  id of key to cancel trade offers
    * @return {json} error or success.  Success contains a boolean for successful cancel
    */
   cancelTradeKey(key): any {
     let p = new Promise<any>((resolve, reject) => {
       this._contract.at(this.contractAddr).cancelTradeOffer(key,(error, result) => {
         if (!error) {
           resolve(result);

         } else {
           reject(error);
           console.log(error)
         }
        });
      })
     return p;
   }

   /**
    * setKeyData function. creates or updates a datavalue on a key
    * @param key:  id of key to create data for
    * @param dataKey:  parameter name of the data
    * @param dataValue:  the data
    * @return {json} error or success.  Success contains a boolean for creation
    */
   setKeyData(key, dataKey, dataValue): any {
     let p = new Promise<any>((resolve, reject) => {
       this._contract.at(this.contractAddr).setKeyData(key.toString(), dataKey, dataValue,(error, result) => {
         if (!error) {
           resolve(result);
         } else {
           reject(error);

           console.log(error)
         }
        });
      })
     return p;
   }

   /**
    * getKeyInfo function. gets basic infomraiton on key
    * @param key:  id of key to get data on
    * @return {json} error or success.  Json contains owner, canShare, canSell, canTrade, and parent service values
    */
   getKeyInfo(key): any {
     let p = new Promise<any>((resolve, reject) => {
       this._contract.at(this.contractAddr).getKey(key,(error, result) => {
         if (!error) {
           result.push(key)
           resolve(result);
         } else {
           console.log(error)
           reject(error);

         }
        });
      })
     return p;
   }

   /**
    * hexToAscii function. Turns hex to ascii
    * @param str1:  string to convert
    * @return {str} ascii string
    */
    hexToAscii(str1): string{
   	  var hex  = str1.toString();
   	  var str = '';
   	  for (var n = 0; n < hex.length; n += 2) {
   		   str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
   	   }
   	   return str;
    }

    /**
     * getKeyData function. retrieves data on given parameter from given key
     * @param key:  id of key to retrieve data on
     * @param dataKey:  parameter to retrieve data on
     * @return {json} contains the data of the parameter
     */
   getKeyData(key, dataKey): any {
     let p = new Promise<any>((resolve, reject) => {
       this._contract.at(this.contractAddr).getKeyData(key, dataKey,(error, result) => {
         if (!error) {
           result=this.hexToAscii(result)
           resolve(result);
         } else {
           reject(error);
           console.log(error)
         }
        });
      })
     return p;
   }

   /**
    * getUrlFromKey function. retrieves url tied to a given key
    * @param key:  id of key to retrieve data on
    * @return {json} contains the url for the key
    */
   getUrlFromKey(key): any {
     let p = new Promise<any>((resolve, reject) => {
       this._contract.at(this.contractAddr).getUrlFromKey(key,(error, result) => {
         if (!error) {
           resolve(result);
         } else {
           console.log(error)
         }
        });
      })
     return p;
   }

   /**
    * logAccess function. A service can log access from any of its keys.
    * @param key:  id of key to log for
    * @param data:  data to log
    * @return {json}
    */
   logAccess(key, data): any {
     let p = new Promise<any>((resolve, reject) => {
       this._contract.at(this.contractAddr).logAccess(key, data,(error, result) => {
         if (!error) {
           resolve(result);
         } else {
           console.log(error)
         }
        });
      })
     return p;
   }

   /**
    * message function. services and keys can log messages to each other
    * @param from:  Sender of message
    * @param to:  retriever of message
    * @param category:  category of message
    * @param data:  data to be sent
    * @return {json} contains the url for the key
    */
   message(from, to, category, data): any {
     let p = new Promise<any>((resolve, reject) => {
       this._contract.at(this.contractAddr).message(from, to, category, data,(error, result) => {
         if (!error) {
           resolve(result);
         } else {
           console.log(error)
         }
        });
      })
     return p;
   }

   /**
    * log function. any key or service can log
    * @param from:  who logged hte message
    * @param data:  data to log
    * @return {json} contains the url for the key
    */
   log(from, data): any {
     let p = new Promise<any>((resolve, reject) => {
       this._contract.at(this.contractAddr).log(from,data,(error, result) => {
         if (!error) {
           resolve(result);
         } else {
           console.log(error)
         }
        });
      })
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
                   (err, res) => {
                       if (err.toString() !== 'Error: account is locked') {
                           this.unlockedAccount = this.web3.eth.accounts[0];
                           if (this.unlockedAccount) {
                             if (!this.loaded.value) {
                               this.loadKeysAndServices();
                             }
                             this.authorized.next(true);
                           }

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
             window.addEventListener('load', async () => {
               // Modern dapp browsers...
               if (window.ethereum) {
                 window.web3 = new Web3(ethereum);
                 try {
                   // Request account access if needed
                   await ethereum.enable();
                   // Acccounts now exposed
                   web3.eth.sendTransaction({/* ... */ });
                 } catch (error) {
                   // User denied account access...
                 }
               }
               // Legacy dapp browsers...
               else if (window.web3) {
                 window.web3 = new Web3(web3.currentProvider);
                 // Acccounts always exposed
                 web3.eth.sendTransaction({/* ... */ });
               }
               // Non-dapp browsers...
               else {
                 console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
               }
             });
               this.unlockedAccount = this.web3.eth.accounts[0];
               if (this.unlockedAccount) {
                 this.authorized.next(true);
               }
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
