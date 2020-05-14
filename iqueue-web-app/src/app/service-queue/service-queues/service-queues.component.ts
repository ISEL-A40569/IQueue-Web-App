import { Component, OnInit } from '@angular/core';
import { ServiceQueue } from '../../model/service-queue'
import { HttpService } from '../../services/http-service'

@Component({
  selector: 'app-service-queues',
  templateUrl: './service-queues.component.html'
})
export class ServiceQueuesComponent implements OnInit {
  serviceQueues: ServiceQueue[] = []
  fetching: boolean = false

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.getServiceQueues()
  }

  getServiceQueues() {
    this.fetching = true
    this.httpService.get(`https://localhost:8443/api/iqueue/operator/servicequeue`)
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
