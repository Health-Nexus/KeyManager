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
    this.keyOwners=this.web3Service.returnKeyOwners();
    this.keyAccess=this.web3Service.getkeyAccess()
    console.log('displayData',this.services)

    for(var json in this.keyAccess){
      this.keyAccessArray=json;
    }



    for(var i=0;i<this.services.length;i++){
       this.services[i].keys=[];
       this.services[i].keysExist=false;

      this.urls[this.services[i]._service]=this.web3Service.getServiceURL(this.services[i]._service);
      this.services[i].url=this.web3Service.getServiceURL(this.services[i]._service);
      var length=this.keys.length
      for(var j=0;j<length;j++){
        console.log('index0',i,j,this.keys)

        if(this.services[i]._service==this.keys[j][4]){
          var serviceKey={}
          serviceKey['owner']=this.keys[j][0];
          serviceKey['share']=this.keys[j][1];
          serviceKey['trade']=this.keys[j][2];
          serviceKey['sell']=this.keys[j][3];
          serviceKey['id']=this.keys[j][5];
          console.log('index1',i,j)
          this.keys.splice(j,1);
          j--;
          length--;
          console.log('index2',i,j)
          this.services[i].keys.push(serviceKey);
          this.services[i].keysExist=true;

        }

      }

    }

    console.log('services',this.services)
    console.log('keys',this.keys)

  }

  createService(url): any{
    console.log('here')
    this.web3Service.createservice(url);
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
