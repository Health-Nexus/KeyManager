import { Component, OnInit, Input } from '@angular/core';
import { HealthcashService } from '../shared/web3/healthcash.service';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})
export class TokenComponent implements OnInit {
  @Input() tokenService: any;
  @Input() drsService: any;
  balance:number;
  canspend:number;
  addr:string;
  amount:number;
  editing:boolean = false;
  constructor(private healthcashService:HealthcashService) { }

  ngOnInit() {
    this.healthcashService.currentBalance.subscribe(balance => this.balance = balance)
    this.healthcashService.allowedToSpend.subscribe(canspend => this.canspend = canspend)
    // this.canspend = 50000;  * JADE using canspend as the value (use amount instead?)
  }

  balances(): any{
    this.healthcashService.balanceOf();
    this.healthcashService.drsApprovedFor();
  }

  editCanSpend() {
    this.editing = !this.editing;
  }

  transfer(addr, amount): any{
    this.healthcashService.transfer(addr, amount);
  }

}
