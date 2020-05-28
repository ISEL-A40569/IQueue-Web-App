import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorBeaconComponent } from './operator-beacon.component';

describe('OperatorBeaconComponent', () => {
  let component: OperatorBeaconComponent;
  let fixture: ComponentFixture<OperatorBeaconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatorBeaconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorBeaconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
