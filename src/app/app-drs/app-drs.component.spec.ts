import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDrsComponent } from './app-drs.component';

describe('AppDrsComponent', () => {
  let component: AppDrsComponent;
  let fixture: ComponentFixture<AppDrsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppDrsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppDrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
