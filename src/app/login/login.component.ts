import { Component } from '@angular/core';

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  wallet = '';
  private=false;
  keystore=false;


  chooseWallet(type) {
    console.log(type);
    this.wallet=type;
  }

}
