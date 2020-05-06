import { Component, OnInit } from '@angular/core';
import { ServiceQueue } from '../model/ServiceQueue'
import { HttpService } from '../services/http.service'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-service-queue',
  templateUrl: './service-queue.component.html'
})
export class ServiceQueueComponent implements OnInit {
  serviceQueue: ServiceQueue = new ServiceQueue()
  createMode: boolean = true

  constructor(private httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (this.route.snapshot.params['serviceQueueId'] &&
      this.route.snapshot.params['operatorId']) {
      this.createMode = false
      this.serviceQueue.serviceQueueId = this.route.snapshot.params['serviceQueueId']
      this.serviceQueue.operatorId = this.route.snapshot.params['operatorId']
      this.getServiceQueue()
    }
  }

  getServiceQueue() {
    this.httpService
      .get(`http://localhost:8080/api/iqueue/operator/${this.serviceQueue.operatorId}/servicequeue/${this.serviceQueue.serviceQueueId}`)
      .subscribe(responseData => {
        this.serviceQueue.serviceQueueDescription = responseData['serviceQueueDescription']
        this.serviceQueue.serviceQueueTypeId = responseData['serviceQueueTypeId']
        this.serviceQueue.dailyLimit = responseData['dailyLimit']
      })
  }

  onCreateServiceQueue() {
    this.httpService
      .post(`http://localhost:8080/api/iqueue/operator/servicequeue/`, this.serviceQueue)
      .subscribe(responseData => {
        this.serviceQueue.serviceQueueId = responseData['serviceQueueId']
        alert(`Service Queue successfully created with id ${this.serviceQueue.serviceQueueId}!`)
        this.createMode = false
      },
        error => {
          alert('Error creating Service Queue!')
        })
  }

  onUpdateServiceQueue() {
    this.httpService
      .update(`http://localhost:8080/api/iqueue/operator/${this.serviceQueue.operatorId}/servicequeue/${this.serviceQueue.serviceQueueId}`,
        this.serviceQueue)
      .subscribe(responseData => {
        alert(`Service Queue with id ${this.serviceQueue.serviceQueueId} successfully updated!`)
      },
        error => {
          alert(`Error updating Service Queue ${this.serviceQueue.serviceQueueId}!`)
        })
  }

  onDeleteServiceQueue() {
    this.httpService.delete(`http://localhost:8080/api/iqueue/operator/${this.serviceQueue.operatorId}/servicequeue/${this.serviceQueue.serviceQueueId}`)
      .subscribe(responseData => {
        alert(`Service Queue with id ${this.serviceQueue.serviceQueueId} successfully deleted!`)
        this.router.navigate([`/servicequeues`])
      },
        error => {
          alert(`Error deleting Service Queue ${this.serviceQueue.serviceQueueId}!`)
        })
  }

}
