import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeskUsersComponent } from './desk-users.component';

describe('DeskUsersComponent', () => {
  let component: DeskUsersComponent;
  let fixture: ComponentFixture<DeskUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeskUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeskUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
