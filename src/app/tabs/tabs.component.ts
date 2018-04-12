import { Component, Input, OnInit } from '@angular/core';
import { Tab } from 'app/tab/tab.interface';
import { Web3Service } from '../shared/web3/web3.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})

export class TabsComponent implements OnInit {
  tabs: Tab[] = [];
  selectedParentKey?: string;
  selectedChildKey?: string;

  constructor(private web3Service:Web3Service) { }


  ngOnInit() {
    this.web3Service.parentKeyChanged$.subscribe(
    selectedParent => {
      this.selectedParentKey = selectedParent;
    });

    this.web3Service.childKeyChanged$.subscribe(
    selectedChild => {
      this.selectedChildKey = selectedChild;
    });
  }

  selectTab(tab: Tab) {
    this.tabs.forEach((tab) => {
      tab.active = false;
    });
    tab.active = true;
  }

  addTab(tab: Tab) {
    if (this.tabs.length > 0) {
      tab.active = true;
    }
    this.tabs.push(tab);
  }

  clearSelectedKeys(): void {
    this.web3Service.changeParentKey(undefined);
    this.web3Service.changeChildKey(undefined);
  }

  clearChildKey(): void {
    this.web3Service.changeChildKey(undefined);
  }
}
