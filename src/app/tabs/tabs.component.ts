import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {
  selectedTab = 'tokens';

  constructor() { }

  ngOnInit() {
  }

  selectTab(tab) {
    this.selectedTab = tab;
  }

}
