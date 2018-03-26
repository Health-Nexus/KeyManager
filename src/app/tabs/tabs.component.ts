import { Component, Input } from '@angular/core';
import { Tab } from 'app/tab/tab.interface';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})

export class TabsComponent {
  tabs: Tab[] = [];

  constructor() { }

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
}
