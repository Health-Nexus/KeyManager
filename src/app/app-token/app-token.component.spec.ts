import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTokenComponent } from './app-token.component';

describe('AppTokenComponent', () => {
  let component: AppTokenComponent;
  let fixture: ComponentFixture<AppTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppTokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
