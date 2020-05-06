import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceQueuesComponent } from './service-queues.component';

describe('ServiceQueuesComponent', () => {
  let component: ServiceQueuesComponent;
  let fixture: ComponentFixture<ServiceQueuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceQueuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceQueuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
