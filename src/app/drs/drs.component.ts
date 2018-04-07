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
   services:any= [];
   serviceIndex: any = {};
   keys:any= [];
   data:any;
   dataOnKey:any;
   dataToDisplay:any;
   keysData:any= [];
   keyOwners:any={};
   keyAccess:any={};
   urls: any={};
   keyAccessArray: any=[];
   image: any;
   selectedParentKey?: any;
   selectedChildKey?: any;
   loaded: boolean = false
   editingPermissions: boolean = false

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
      var childKey = this.selectedParentKey && this.selectedParentKey.keyIndex[selectedChild];

      this.selectedChildKey = childKey;
    });

    this.web3Service.onLoad$.subscribe(
    hasLoaded => {
      this.loaded = hasLoaded;
      if (this.loaded) {
          this.displayData();
      }
    });
  }

  pickParentKey(parentKey: string) {
    this.web3Service.changeParentKey(parentKey);
  }

  pickChildKey(childKey: string) {
    this.web3Service.changeChildKey(childKey);
  }

  displayData() {
    var updatedServices = this.web3Service.getServices();
    this.keys=this.web3Service.getKeys()
    console.log('keys:',this.keys);
    this.keyOwners=this.web3Service.returnKeyOwners();
    console.log('Display Data keyOwners:',this.keyOwners);
    var keyAccessTemp=this.web3Service.getkeyAccess()
    this.keyAccessArray=[];
    console.log('keyAccessTemp; ', keyAccessTemp)
    let sharedKey = {};

    for(var json in keyAccessTemp){
      console.log('json; ', json)
      sharedKey = {'key':json,
                    'url':keyAccessTemp[json].url.trim(),
                    'share':keyAccessTemp[json].share,
                    'trade':keyAccessTemp[json].trade,
                    'sell':keyAccessTemp[json].sell,
                    'service':keyAccessTemp[json].service}
      this.keyAccessArray.push(sharedKey);
    }

    for(var i = 0; i < updatedServices.length; i++) {
       updatedServices[i].keys=[];
       updatedServices[i].keysExist=false;
      this.urls[updatedServices[i]._service]=this.web3Service.getServiceURL(updatedServices[i]._service);
      updatedServices[i].url=this.web3Service.getServiceURL(updatedServices[i]._service);
      var length=this.keys.length
      for(var j=0;j<length;j++){

        if(updatedServices[i]._service==this.keys[j].service){
          var serviceKey=<any>{}
          serviceKey['owner']=this.keys[j].owner;
          serviceKey['share']=this.keys[j].share;
          serviceKey['trade']=this.keys[j].trade;
          serviceKey['sell']=this.keys[j].sell;
          serviceKey['id']=this.keys[j].key;
          //this.keys.splice(j,1);
          //j--;
          //length--;
          updatedServices[i].keys.push(serviceKey);
          if (!updatedServices[i].keyIndex) {
            updatedServices[i].keyIndex = {};
          }
          updatedServices[i].keyIndex[serviceKey.id] = serviceKey;
          updatedServices[i].keysExist=true;

        }

      }
      var currentService = updatedServices[i];
      this.serviceIndex[currentService._service] = currentService;
    }

    this.zone.run(() => {
        this.services = updatedServices;
    });

    console.log('DD services',updatedServices)
    console.log('DD keys',this.keys.length)
    console.log('DD keysAccess',this.keyAccessArray)

  }

  log(val) { console.log(val); }

  createService(url): any{
    console.log('here')
    this.web3Service.createservice(url);
  }

  setData(key,type,parameter): any{
    console.log('here',parameter, ' : ', typeof parameter)
    this.dataOnKey=this.web3Service.setKeyData(key, type, parameter);
    console.log('retrieved data DRS',this.dataOnKey)
  }

  getData(key,type): any{
    console.log('here')
    this.dataOnKey=this.web3Service.getKeyData(key, type);
    console.log(this.data)
  }

  togglePane(event): any {
     let el = event.target.nextElementSibling
     if (el.classList.contains('hidden')) {
      el.classList.remove('hidden');
     } else {
      el.classList.add('hidden');
     }
  }

  retrieveData(urlKey,parameter,key): any{
    console.log('retrieve: ',urlKey)
    this.dataToDisplay=this.web3Service.dataRequestTest(urlKey,parameter,key).then(function(value){
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
    }.bind(this));

    console.log(this.dataToDisplay);
  }

  setActive(key, value) {
      this.editingPermissions = true;
      this.selectedChildKey[key] = value;
  }

  shareKey(id,account): any{
    this.web3Service.shareKey(id,account);
  }

  unshareKey(id,account): any{
    this.web3Service.unshareKey(id,account);

  }

  tradeKeyOffer(key,keyToTrade): any{
    this.web3Service.tradeKey(key,keyToTrade);

  }

  cancelTradeKeyOffer(key): any{
    this.web3Service.CancelTradeKey(key);

  }

  tradeKey(key,keyTrade): any{
    this.web3Service.CreateTradeKeyOffer(key,keyTrade);

  }

  sellKeyOffer(key,buyer,price,sellPermission): any{
    this.web3Service.createSalesOffer(key,buyer,price,sellPermission);

  }

  cancelSellKeyOffer(key): any{
    this.web3Service.cancelSalesOffer(key);
  }

  actionAllowed(action: string, key: string): boolean {
    return this.selectedChildKey && this.selectedChildKey[action] && !this.keyHasOwner(key);
  }

  keyHasOwner(key: string): boolean {
    return this.keyOwners[key] && this.keyOwners[key].length > 0;
  }

  purchaseKey(key): any{
    this.web3Service.purchaseKey(key);
  }

  changePermission(): any {
    this.editingPermissions = false;
    let selected = this.selectedChildKey && this.selectedChildKey;
    let id = selected.id;
    let share = selected.share;
    let trade = selected.trade;
    let sell = selected.sell;
    this.web3Service.permissionKey(id, share, trade, sell);
  }

  createKey(url): any{
    this.web3Service.createKey(url);
  }

  expand(service): any{

  }

}
