import { Component, OnInit, Input } from '@angular/core';
import { HealthcashService } from '../shared/web3/healthcash.service';
import { Web3Service } from '../shared/web3/web3.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-drs',
  templateUrl: './drs.component.html',
  styleUrls: ['./drs.component.css']
})
export class DrsComponent implements OnInit {
  @Input() tokenServices: any;
  @Input() drsServices: any;
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

constructor(private web3Service:Web3Service,private healthcashService:HealthcashService) {
   }


  ngOnInit() {
  }

  displayData(){
    this.services=this.web3Service.getServices()
    this.keys=this.web3Service.getKeysData()
    console.log('keys:',this.keys);
    this.keyOwners=this.web3Service.returnKeyOwners();
    var keyAccessTemp=this.web3Service.getkeyAccess()
    this.keyAccessArray=[];
    console.log('keyAccessTemp; ', keyAccessTemp)

    for(var json in keyAccessTemp){
      console.log('json; ', json)
      this.keyAccessArray.push({'key':json,'url':keyAccessTemp[json].url.trim()});
    }

    for(var i=0;i<this.services.length;i++){
       this.services[i].keys=[];
       this.services[i].keysExist=false;

      this.urls[this.services[i]._service]=this.web3Service.getServiceURL(this.services[i]._service);
      this.services[i].url=this.web3Service.getServiceURL(this.services[i]._service);
      var length=this.keys.length
      for(var j=0;j<length;j++){

        if(this.services[i]._service==this.keys[j][4]){
          var serviceKey={}
          serviceKey['owner']=this.keys[j][0];
          serviceKey['share']=this.keys[j][1];
          serviceKey['trade']=this.keys[j][2];
          serviceKey['sell']=this.keys[j][3];
          serviceKey['id']=this.keys[j][5];
          this.keys.splice(j,1);
          j--;
          length--;
          this.services[i].keys.push(serviceKey);
          this.services[i].keysExist=true;

        }

      }

    }

    console.log('services',this.services)
    console.log('keys',this.keys)
    console.log('keys',this.keyAccessArray)


  }

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




  retrieveData(urlKey,parameter,key): any{
    console.log('retrieve: ',urlKey)
    this.dataToDisplay=this.web3Service.dataRequestTest(urlKey,parameter,key)
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
