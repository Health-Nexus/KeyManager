import { Component, Input, OnInit } from '@angular/core';
import { Tab } from 'app/tab/tab.interface';
import { DrsService } from '../shared/web3/drs.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {
  tabs: Tab[] = [];
  selectedParentKey?: string;
  selectedChildKey?: string;

  constructor(private drsService:DrsService) {};

  ngOnInit() {
    this.drsService.parentKeyChanged$
        .subscribe(selectedParent => {
          this.selectedParentKey = selectedParent;
    });

    this.drsService.childKeyChanged$
    .subscribe(selectedChild => {
        this.selectedChildKey = selectedChild;
    });
  };

  selectTab(tab: Tab) {
    this.tabs.forEach((tab) => {
      tab.active = false;
    });
    tab.active = true;
  };

  addTab(tab: Tab) {
    if (this.tabs.length > 0) {
      tab.active = true;
    }
    this.tabs.push(tab);
  };

  clearSelectedKeys(): void {
    this.drsService.changeParentKey(undefined);
    this.drsService.changeChildKey(undefined);
  };

  clearChildKey(): void {
    this.drsService.changeChildKey(undefined);
  };

};
