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
  addr:string;
  amount:number;
  constructor(private healthcashService:HealthcashService) { }

  ngOnInit() {
    this.healthcashService.currentBalance.subscribe(balance => this.balance = balance)


  }



    balances(): any{
      this.healthcashService.balanceOf();
    }

    transfer(addr, amount): any{
      this.healthcashService.transfer(addr, amount);
    }


}
