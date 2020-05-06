import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceQueueComponent } from './service-queue.component';

describe('ServiceQueueComponent', () => {
  let component: ServiceQueueComponent;
  let fixture: ComponentFixture<ServiceQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
