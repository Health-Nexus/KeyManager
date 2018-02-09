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

  urls: any={};
  constructor(private web3Service:Web3Service,private healthcashService:HealthcashService) {
   }


  ngOnInit() {
  }

  displayData(){
    this.services=this.web3Service.getServices()
    this.keys=this.web3Service.getKeys()
    console.log(this.services)

    for(var i=0;i<this.services.length;i++){
      console.log('for loop',this.services[i]);
      this.urls[this.services[i]._service]=this.web3Service.getServiceURL(this.services[i]._service);
      this.services[i].url=this.web3Service.getServiceURL(this.services[i]._service);

    }
    console.log(this.urls)
  }

  createService(url): any{
    console.log('here')
    this.web3Service.createservice(url);
  }

  expand(service): any{

  }

}
