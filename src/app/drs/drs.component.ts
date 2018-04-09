import { Component,SecurityContext, OnInit, Input, ViewChild, ViewContainerRef, NgZone } from '@angular/core';
import { HealthcashService } from '../shared/web3/healthcash.service';
import { Web3Service } from '../shared/web3/web3.service';
import { WindowRefService } from '../shared/window-ref.service';
import { AsyncPipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-drs',
  templateUrl: './drs.component.html',
  styleUrls: ['./drs.component.css']
})
export class DrsComponent implements OnInit {
  @Input() tokenServices: any;
  @Input() drsServices: any;
   private _window: Window;
   services: any= [];
   serviceIndex: any = {};
   keys: any= [];
   keysIndex: any= {};
   data: any;
   dataOnKey: any;
   dataToDisplay: any;
   keysData: any = [];
   keyOwners: any = {};
   keyAccess: any = {};
   urls: any={};
   keyAccessArray: any=[];
   image: any;
   json: string;
   selectedParentKey?: any;
   selectedChildKey?: any;
   childParams?: any = {};
   childParamsArray?: any = [];
   loaded: boolean = false;
   editingPermissions: boolean = false;
   editingParam?: any = {};

constructor(private web3Service:Web3Service,private healthcashService:HealthcashService,private _sanitizer: DomSanitizer,windowRef: WindowRefService, private zone: NgZone) {
  this._window = windowRef.nativeWindow;
   }


  ngOnInit() {
    this.web3Service.parentKeyChanged$.subscribe(
    selectedParent => {
      var parentService = this.serviceIndex[selectedParent];
      this.selectedParentKey = parentService;
    });

    this.web3Service.childKeyChanged$.subscribe(
    selectedChild => {
      let childKeyOfParent = this.selectedParentKey && this.selectedParentKey.keyIndex[selectedChild];
      let sharedKey = this.keyAccess && this.keyAccess[selectedChild];
      let ownedKey = this.keysIndex && this.keysIndex[selectedChild];

      this.selectedChildKey = childKeyOfParent || sharedKey || ownedKey;
    });

    this.web3Service.onLoad$.subscribe(
    hasLoaded => {
      this.loaded = hasLoaded;
      if (this.loaded) {
          this.displayData();
      }
    });
  }

  displayData() {
    var updatedServices = this.web3Service.getServices();

    this.keys = this.web3Service.getKeys();
    console.log('keys:',this.keys);
    this.keyOwners = this.web3Service.returnKeyOwners();
    console.log('Display Data keyOwners:',this.keyOwners);

    this.keyAccess = this.web3Service.getkeyAccess();
    this.keyAccessArray = [];
    console.log('keyAccessTemp; ', this.keyAccess)
    for (var json in this.keyAccess) {
      console.log('json; ', json);
      let currentKeyAccess = this.keyAccess[json];
      this.keyAccessArray.push({
        'key' : json,
        'url' : currentKeyAccess.url,//.trim(),
        'share' : currentKeyAccess.share,
        'trade' : currentKeyAccess.trade,
        'sell' : currentKeyAccess.sell,
        'service' : currentKeyAccess.service
      });
    }

    for (var i = 0; i < updatedServices.length; i++) {
      let currentService = updatedServices[i];
      let url = this.web3Service.getServiceURL(currentService._service);
      currentService.keys = [];
      currentService.keysExist = false;
      currentService.url = url;
      this.urls[currentService._service] = url;

      var length = this.keys.length;
      for (var j = 0; j < length; j++) {
        let currentKey = this.keys[j];
        this.keysIndex[currentKey.key] = currentKey;
        if (currentService._service == currentKey.service) {
          var serviceKey = {
            'owner': currentKey.owner,
            'share': currentKey.share,
            'trade': currentKey.trade,
            'sell': currentKey.sell,
            'id': currentKey.key
          };
          currentService.keys.push(serviceKey);
          if (!currentService.keyIndex) {
            currentService.keyIndex = {};
          };
          currentService.keyIndex[serviceKey.id] = serviceKey;
          currentService.keysExist = true;
        }
      }
      this.serviceIndex[currentService._service] = currentService;
    };

    this.zone.run(() => {
        this.services = updatedServices;
    });

    console.log('DD services', updatedServices);
    console.log('DD keys', this.keys.length);
    console.log('DD keysAccess', this.keyAccessArray);

  }

  log(val) { console.log(val); }


  /* KEYS TAB */
  createService(url): any {
    this.web3Service.createservice(url);
  }

  pickParentKey(parentKey: string) {
    this.web3Service.changeParentKey(parentKey);
  }

  purchaseKey(key): any {
    this.web3Service.purchaseKey(key);
  }

  /* PARENT KEY VIEW */
  createParentKey(url): any {
    this.web3Service.createKey(url);
  }

  pickChildKey(childKey: string) {
    this.web3Service.changeChildKey(childKey);
  }

  /* CHILD KEY VIEW */
  retrieveData(parameter): any {
    var self = this;
    var urlKey = this.selectedParentKey && this.selectedParentKey.url.__zone_symbol__value;
    var keyId = this.selectedChildKey && this.selectedChildKey.id;
    console.log('retrieve: ',urlKey);
    this.dataToDisplay = this.web3Service.dataRequestTest(urlKey, parameter, keyId).then(function(value) {
      // Do things after onload
      console.log('this.dataToDisplay:', value);
      let contentType = value.headers.get("Content-Type");
      var blob = new Blob([value._body], {type: contentType });

      if (this._window.navigator && this._window.navigator.msSaveOrOpenBlob) {
       this._window.navigator.msSaveOrOpenBlob(blob, parameter);
      } else {
       var a = document.createElement('a');
       a.href = this._window.URL.createObjectURL(blob);
       // a.href = URL.createObjectURL(blob);
       a.download = parameter;
       document.body.appendChild(a);
       a.click();
       document.body.removeChild(a);
      }

      // Do things after onload
        console.log('this.dataToDisplay: ',value)
        if(value.headers.get("Content-Type") =='image/jpeg')
        {

          // var trust=this._sanitizer.sanitize(SecurityContext.RESOURCE_URL,'data:image/jpg;base64,'
          //            + value._body);
          //            console.log(trust);
        this.image = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
                   + value._body);

          //This allows the conditional viewing of the returned image.
          if (this._window.confirm("We retrieved an image from the data service. The image is unfiltered and could be innappropriate. Press 'OK' to view the image.")) {
            var image = new Image();
            image.src = "data:image/jpg;base64," + value._body;
            var w = this._window.open("");
            w.document.write(image.outerHTML);
          } else {
            console.log(this.image)
          }

        }
        if(value.headers.get("Content-Type") =="audio/mpeg"){
          // this.audio = new Audio();
          // this.audio.src =value._body;
          // this.audio.load();
          // this.audio.play();
        }


      switch(contentType) {
        case 'image/jpeg':
        var image = new Image();
        image.src = "data:image/jpg;base64," + value._body;
        var w = this._window.open("");
        w.document.write(image.outerHTML);
            // var trust=this._sanitizer.sanitize(SecurityContext.RESOURCE_URL,'data:image/jpg;base64,'
            //            + value._body);
            //            console.log(trust);

            //This allows the conditional viewing of the returned image.
            // if (this._window.confirm("We retrieved an image from the data service. The image is unfiltered and could be innappropriate. Press 'OK' to download the image.")) {
              self.image = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + value._body);
            // } else {
            //   console.log(this.image);
            // }
            break;
        // case 'audio/mpeg':
        //   const blob = new Blob([value], { type: contentType });
        //   const url = window.URL.createObjectURL(blob);
        //   break;
        //   // this.audio = new Audio();
        //   // this.audio.src =value._body;
        //   // this.audio.load();
        //   // this.audio.play();
        default:
          self.json = value.json();
      }
    }.bind(this));

    console.log(this.dataToDisplay);
  }

  changePermissions(): any {
    this.editingPermissions = false;
    var selected = this.selectedChildKey && this.selectedChildKey || {};
    var id = selected.id;
    var share = selected.share;
    var trade = selected.trade;
    var sell = selected.sell;
    this.web3Service.permissionKey(id, share, trade, sell);
  }

  setActive(key, value) {
    this.editingPermissions = true;
    this.selectedChildKey[key] = value;
  }

  editParam(key) {
    this.editingParam = {};
    this.editingParam[key] = true;
  }

  getData(type): any {
    var keyId = this.selectedChildKey && this.selectedChildKey.id;
    console.log('getData',type)
    this.dataOnKey = this.web3Service.getKeyData(keyId, type);
    console.log(this.dataOnKey)
  }

  setData(type, parameter): any {
    var selected = this.selectedChildKey && this.selectedChildKey;
    console.log('here', parameter, ' : ', typeof parameter)
    this.dataOnKey = this.web3Service.setKeyData(selected.id, type, parameter);
    if (selected) {
      if (!parameter) {
        delete this.childParams[type];
      } else {
        this.childParams[type] = parameter;
      }
      this.zone.run(() => {
          this.childParamsArray = Object.keys(this.childParams);
      });
      this.editingParam = {};
    }
    console.log('retrieved data DRS', this.dataOnKey)
  }

  shareKey(id, account): any {
    this.web3Service.shareKey(id, account);
  }

  unshareKey(id, account): any {
    this.web3Service.unshareKey(id, account);
  }

  canMakeSaleOffer(): boolean {
    return this.selectedChildKey && this.selectedChildKey.sell && !this.keyHasOwner(this.selectedChildKey);
  }

  keyHasOwner(key: string): boolean {
    return this.keyOwners[key] && this.keyOwners[key].length > 0;
  }

  sellKeyOffer(buyer, price, sellPermission): any {
    var selected = this.selectedChildKey && this.selectedChildKey || {};
    var keyId = selected.id;
    this.web3Service.createSalesOffer(keyId, buyer, price, sellPermission);
  }

  cancelTradeKeyOffer(key): any {
    this.web3Service.CancelTradeKey(key);
  }




  togglePane(event): any {
     let el = event.target.nextElementSibling
     if (el.classList.contains('hidden')) {
      el.classList.remove('hidden');
     } else {
      el.classList.add('hidden');
     }
  }

  tradeKeyOffer(key, keyToTrade): any {
    this.web3Service.tradeKey(key,keyToTrade);
  }

  tradeKey(key,keyTrade): any {
    this.web3Service.CreateTradeKeyOffer(key,keyTrade);
  }

  cancelSellKeyOffer(key): any {
    this.web3Service.cancelSalesOffer(key);
  }
}
