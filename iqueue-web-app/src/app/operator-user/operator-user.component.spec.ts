import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorUserComponent } from './operator-user.component';

describe('OperatorUserComponent', () => {
  let component: OperatorUserComponent;
  let fixture: ComponentFixture<OperatorUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatorUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
