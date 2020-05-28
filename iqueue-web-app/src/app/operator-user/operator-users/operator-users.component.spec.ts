import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorUsersComponent } from './operator-users.component';

describe('OperatorUsersComponent', () => {
  let component: OperatorUsersComponent;
  let fixture: ComponentFixture<OperatorUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatorUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
