import { Component, OnInit } from '@angular/core';
import { ServiceQueue } from '../../model/service-queue'
import { HttpService } from '../../services/http-service'
import { UriBuilderService } from '../../services/uri-builder-service'

@Component({
  selector: 'app-service-queues',
  templateUrl: './service-queues.component.html'
})
export class ServiceQueuesComponent implements OnInit {
  serviceQueues: ServiceQueue[] = []
  fetching: boolean = false
  operatorId: string

  constructor(private httpService: HttpService,
    private uriBuilderService: UriBuilderService) { }

  ngOnInit(): void {
    this.operatorId = localStorage.getItem('operatorId')
    this.getServiceQueues()
  }

  getServiceQueues() {
    this.fetching = true
    this.httpService.get(this.uriBuilderService.getOperatorServiceQueuesUri(this.operatorId))
      .subscribe(responseData => {
        for (const entry in responseData) {
          this.serviceQueues.push(responseData[entry])
        }
        this.fetching = false
      }, error => {
        this.fetching = false
      })
  }

}
