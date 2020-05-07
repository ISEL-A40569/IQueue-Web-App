import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesksComponent } from './desks.component';

describe('DesksComponent', () => {
  let component: DesksComponent;
  let fixture: ComponentFixture<DesksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
