import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceQueueReportComponent } from './service-queue-report.component';

describe('ServiceQueueReportComponent', () => {
  let component: ServiceQueueReportComponent;
  let fixture: ComponentFixture<ServiceQueueReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceQueueReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceQueueReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
