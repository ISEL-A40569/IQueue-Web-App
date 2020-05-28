import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorBeaconsComponent } from './operator-beacons.component';

describe('OperatorBeaconsComponent', () => {
  let component: OperatorBeaconsComponent;
  let fixture: ComponentFixture<OperatorBeaconsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatorBeaconsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorBeaconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
