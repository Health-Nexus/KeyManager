import { Component,SecurityContext, OnInit, Input, ViewChild, ViewContainerRef, NgZone } from '@angular/core';
import { HealthcashService } from '../shared/web3/healthcash.service';
import { DrsService } from '../shared/web3/drs.service';
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
   fileToUpload: File = null;
   show: boolean = false;

constructor(private drsService:DrsService,private healthcashService:HealthcashService,private _sanitizer: DomSanitizer,windowRef: WindowRefService, private zone: NgZone) {
  this._window = windowRef.nativeWindow;

  if (!window.hasOwnProperty('web3')) {
    return;
  }
}

  ngOnInit() {
    this.drsService.parentKeyChanged$.subscribe(
    selectedParent => {
      var parentService = this.serviceIndex[selectedParent];
      this.selectedParentKey = parentService;
    });

    this.drsService.childKeyChanged$.subscribe(
    selectedChild => {
      let childKeyOfParent = this.selectedParentKey && this.selectedParentKey.keyIndex[selectedChild];
      let sharedKey = this.keyAccess && this.keyAccess[selectedChild];
      let ownedKey = this.keysIndex && this.keysIndex[selectedChild];

      this.selectedChildKey = childKeyOfParent || sharedKey || ownedKey;
    });

    this.drsService.onLoad$.subscribe(
    hasLoaded => {
      this.loaded = hasLoaded;
      if (this.loaded) {
          this.displayData();
      }
    });
  }

  handleFileInput(files: FileList) {
    var self = this;

    var urlKey = this.selectedParentKey && this.selectedParentKey.url.__zone_symbol__value;
    var keyId = this.selectedChildKey && this.selectedChildKey.id;

    if (typeof urlKey === "undefined") {
      urlKey = this.selectedChildKey.url;
      keyId = this.selectedChildKey.key;
    }
    this.fileToUpload = files.item(0);

    this.drsService.uploadFile(this.fileToUpload,urlKey);
  }


  displayData() {
    var updatedServices = this.drsService.getServices();
    console.log('Updated Services: ', updatedServices)
    var temp=[]
    for(var i=0; i<updatedServices.length; i++){
      if(updatedServices[i]._service!='0x3ce9ef5b6cf94f9b8ce9d3216f16790ca264476322ef2f4e22ea5f42d98688b0' &&
      updatedServices[i]._service!='0xa6de77bb66c6805ea6100178cde7800778ce36b5a2415f2de38a77193b8dcd98' &&
      updatedServices[i]._service!='0xd1ee719b312fe66f2048155ad5c04afb2bfe2e8855537683e5bcf2e4aa95eee4' &&
      updatedServices[i]._service!='0x387e5ab2b7764786e8696b98f675c55410813474aa163958fd66cc33f8691304' &&
      updatedServices[i]._service!='0x5b41bca00fceabf17f418c96db3638e31a0f7c9e23370b5bf62b71d6d6c191ec' &&
      updatedServices[i]._service!='0x72f876de7aa61b524048033415c950348ff2fe46597098bc60c6a0c718b4e44d' &&
      updatedServices[i]._service!='0x9426e04fe757749698e850c413f730c3970dc88e0d73661c4acc01f7f2d0de74' &&
      updatedServices[i]._service!='0x54818303b4622a678fbdc9397ee39face49bd67db5af023664dd84e7192ea7ae' &&
      updatedServices[i]._service!='0x17acc4f9bba840c491c1c9cadb7974ff09d990ece5b38776ba1c0ccd926a4bf9' &&
      updatedServices[i]._service!='0x748497a9052948b47e42a1c2c74e678746ef4714f2c5a36b972cb69f1d0e1c3d'
    ){
        temp.push(updatedServices[i])
      }
    }
    updatedServices=temp;
    this.keys = this.drsService.getKeys();
    this.keyOwners = this.drsService.returnKeyOwners();

    this.keyAccess = this.drsService.getkeyAccess();
    this.keyAccessArray = [];
    for (var json in this.keyAccess) {
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
      let url = this.drsService.getServiceURL(currentService._service);
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



  }

  log(val) { console.log(val); }


  /* KEYS TAB */
  createService(url): any {
    this.drsService.createservice(url);
  }

  pickParentKey(parentKey: string) {
    this.drsService.changeParentKey(parentKey);
  }

  purchaseKey(key): any {
    this.drsService.purchaseKey(key);
  }

  /* PARENT KEY VIEW */
  createParentKey(url): any {
    this.drsService.createKey(url);
  }

  pickChildKey(childKey: string) {
    this.drsService.changeChildKey(childKey);
  }

  /* CHILD KEY VIEW */
  retrieveData(parameter): any {
    var self = this;

    var urlKey = this.selectedParentKey && this.selectedParentKey.url.__zone_symbol__value;
    var keyId = this.selectedChildKey && this.selectedChildKey.id;

    if (typeof urlKey === "undefined") {
      urlKey = this.selectedChildKey.url;
      keyId = this.selectedChildKey.key;
    }

    this.dataToDisplay = this.drsService.dataRequestTest(urlKey, parameter, keyId).then(function(value) {
      // Do things after onload
      let contentType = value.headers.get("Content-Type");
      var blob = new Blob([value._body], {type: contentType });

      if (this._window.navigator && this._window.navigator.msSaveOrOpenBlob) {
       this._window.navigator.msSaveOrOpenBlob(blob, parameter);
      } else {
         var a = document.createElement('a');
         a.href = URL.createObjectURL(blob);
         a.download = parameter;
         document.body.appendChild(a);
         a.click();
         document.body.removeChild(a);
      }


    }.bind(this));

  }

  changePermissions(): any {
    this.editingPermissions = false;
    var selected = this.selectedChildKey && this.selectedChildKey || {};
    var id = selected.id;
    var share = selected.share;
    var trade = selected.trade;
    var sell = selected.sell;
    this.drsService.permissionKey(id, share, trade, sell);
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
    this.dataOnKey = this.drsService.getKeyData(keyId, type);
  }

  setData(type, parameter): any {
    var selected = this.selectedChildKey && this.selectedChildKey;
    this.drsService.setKeyData(selected.id, type, parameter);
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
  }

  shareKey(id, account): any {
    this.drsService.shareKey(id, account);
  }

  unshareKey(id, account): any {
    this.drsService.unshareKey(id, account);
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
    this.drsService.createSalesOffer(keyId, buyer, price, sellPermission);
  }

  cancelTradeKeyOffer(key): any {
    this.drsService.cancelTradeKey(key);
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
    this.drsService.tradeKey(key,keyToTrade);
  }

  tradeKey(key,keyTrade): any {
    this.drsService.CreateTradeKeyOffer(key,keyTrade);
  }

  cancelSellKeyOffer(key): any {
    this.drsService.cancelSalesOffer(key);
  }

  updatePhuse(phuseNumber): any {
    var self = this;

    var urlKey = this.selectedParentKey && this.selectedParentKey.url.__zone_symbol__value;
    var keyId = this.selectedChildKey && this.selectedChildKey.id;

    if (typeof urlKey === "undefined") {
      urlKey = this.selectedChildKey.url;
      keyId = this.selectedChildKey.key;
    }
    this.drsService.updatePhuse(urlKey,phuseNumber);
  }

  buttonPhuseOff() {
    this.show = false;
  }

  buttonPhuseOn() {
    this.show = true;
  }

}
