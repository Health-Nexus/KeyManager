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

  constructor(private web3Service:Web3Service,private healthcashService:HealthcashService) { }
  services:any= Array<{}>;
  keys:any= Array<{}>;

  urls: any={};

  ngOnInit() {
  }

  displayData(){
    this.services=this.web3Service.getServices()
    this.keys=this.web3Service.getKeys()
    console.log('keys: 'this.keys)

    for(var i=0;i<this.services.length;i++){
      this.urls[this.services[i]._service]=this.web3Service.getServiceURL(this.services[i]._service);
      this.services[i].url=this.web3Service.getServiceURL(this.services[i]._service);

    }
  }

  createService(url): any{
   this.web3Service.createservice(url);
  }

  createKey(serviceId): any{
    console.log('create service id: ',serviceId)
    this.web3Service.createservice(serviceId);
  }

  expand(service): any{

  }

}
