import { Component,SecurityContext, OnInit, Input, ViewChild, ViewContainerRef } from '@angular/core';
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
   keys:any= [];
   data:any;
   dataOnKey:any;
   dataToDisplay:any;
   keysData:any= [];
   keyOwners:any={};
   keyAccess:any={};
   urls: any={};
   keyAccessArray: any=[];
   isRinkeby: boolean;
   image: any;
   selectedParentKey?: string;
   selectedChildKey?: string;

constructor(private web3Service:Web3Service,private healthcashService:HealthcashService,private _sanitizer: DomSanitizer,windowRef: WindowRefService) {
  this._window = windowRef.nativeWindow;
   }


  ngOnInit() {
    switch(this.web3Service.web3.version.network) {
      case '1':
       this.isRinkeby = false;
       break;
      case '4':
      this.isRinkeby = true;
       break;
      default:
      this.isRinkeby = false;
    }

    this.web3Service.parentKeyChanged$.subscribe(
    selectedParent => {
      this.selectedParentKey = selectedParent;
    });

    this.web3Service.childKeyChanged$.subscribe(
    selectedChild => {
      this.selectedChildKey = selectedChild;
    });
  }

  pickParentKey(parentKey: string) {
    this.web3Service.changeParentKey(parentKey);
  }

  pickChildKey(childKey: string) {
    this.web3Service.changeChildKey(childKey);
  }

  displayData(){
    this.services=this.web3Service.getServices()
    this.keys=this.web3Service.getKeys()
    console.log('keys:',this.keys.length);
    this.keyOwners=this.web3Service.returnKeyOwners();
    console.log('Display Data keyOwners:',this.keyOwners);
    var keyAccessTemp=this.web3Service.getkeyAccess()
    this.keyAccessArray=[];
    console.log('keyAccessTemp; ', keyAccessTemp)
    let sharedKey = {}

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

    for(var i=0;i<this.services.length;i++){
       this.services[i].keys=[];
       this.services[i].keysExist=false;

      this.urls[this.services[i]._service]=this.web3Service.getServiceURL(this.services[i]._service);
      this.services[i].url=this.web3Service.getServiceURL(this.services[i]._service);
      var length=this.keys.length
      for(var j=0;j<length;j++){

        if(this.services[i]._service==this.keys[j].service){
          var serviceKey={}
          serviceKey['owner']=this.keys[j].owner;
          serviceKey['share']=this.keys[j].share;
          serviceKey['trade']=this.keys[j].trade;
          serviceKey['sell']=this.keys[j].sell;
          serviceKey['id']=this.keys[j].key;
          //this.keys.splice(j,1);
          //j--;
          //length--;
          this.services[i].keys.push(serviceKey);
          this.services[i].keysExist=true;

        }

      }

    }

    console.log('DD services',this.services)
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


  purchaseKey(key): any{
    this.web3Service.purchaseKey(key);
  }

  approveHLTH(value): any {
    this.healthcashService.approve(value)
  }


changePermission(id,share,trade,sell): any{
  console.log('here',id,share,trade,sell)
  this.web3Service.permissionKey(id,share,trade,sell);
}

    createKey(url): any{
      console.log('here')
      this.web3Service.createKey(url);
    }

  expand(service): any{

  }

}
