import { Component, OnInit } from '@angular/core';
import { ServiceQueue } from '../model/service-queue'
import { HttpService } from '../services/http-service'
import { ActivatedRoute, Router } from '@angular/router'
import { ServiceQueueType } from '../model/service-queue-type'
import { CookieService } from 'ngx-cookie-service'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-service-queue',
  templateUrl: './service-queue.component.html'
})
export class ServiceQueueComponent implements OnInit {
  serviceQueue: ServiceQueue = new ServiceQueue()
  createMode: boolean = true
  serviceQueueTypes: ServiceQueueType[] = []
  languageId: string

  constructor(private httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService,
    private translateService: TranslateService) { }

  readonly DEFAULT_LANGUAGE_ID = '1'

  ngOnInit(): void {
    if (this.route.snapshot.params['serviceQueueId']) {
      this.createMode = false
      this.serviceQueue.serviceQueueId = this.route.snapshot.params['serviceQueueId']
      this.getServiceQueue()
    }
    this.serviceQueue.operatorId = parseInt(localStorage.getItem('operatorId'))

    this.languageId = this.cookieService.get('languageId')
    if (!this.languageId)
      this.languageId = this.DEFAULT_LANGUAGE_ID

    this.getServiceQueueTypes()
  }

  getServiceQueue() {
    this.httpService
      .get(`http://localhost:8080/api/iqueue/servicequeue/${this.serviceQueue.serviceQueueId}`)
      // .get(`https://localhost:8443/api/iqueue/servicequeue/${this.serviceQueue.serviceQueueId}`)
      .subscribe(responseData => {
        this.serviceQueue.serviceQueueDescription = responseData['serviceQueueDescription']
        this.serviceQueue.serviceQueueTypeId = responseData['serviceQueueTypeId']
        this.serviceQueue.dailyLimit = responseData['dailyLimit']
      })
  }

  onCreateServiceQueue() {
    this.httpService
      .post(`http://localhost:8080/api/iqueue/servicequeue/`, this.serviceQueue)
      // .post(`https://localhost:8443/api/iqueue/servicequeue/`, this.serviceQueue)
      .subscribe(responseData => {
        this.serviceQueue.serviceQueueId = responseData['serviceQueueId']
        this.translateService
          .get('SERVICEQUEUE_CREATE_SUCCESS', { serviceQueueId: this.serviceQueue.serviceQueueId })
          .subscribe(text =>
            alert(text)
          )
        this.createMode = false
      },
        error => {
          this.translateService.get('SERVICEQUEUE_CREATE_ERROR').subscribe(text =>
            alert(text)
          )
        })
  }

  onUpdateServiceQueue() {
    this.httpService
      .update(`http://localhost:8080/api/iqueue/servicequeue/${this.serviceQueue.serviceQueueId}`,
        // .update(`https://localhost:8443/api/iqueue/servicequeue/${this.serviceQueue.serviceQueueId}`,
        this.serviceQueue)
      .subscribe(responseData => {
        this.translateService
          .get('SERVICEQUEUE_UPDATE_SUCCESS', { serviceQueueId: this.serviceQueue.serviceQueueId })
          .subscribe(text =>
            alert(text)
          )
      },
        error => {
          this.translateService.get('SERVICEQUEUE_UPDATE_ERROR').subscribe(text =>
            alert(`${text} ${this.serviceQueue.serviceQueueId}!`)
          )
        })
  }

  onDeleteServiceQueue() {
    this.httpService.delete(`http://localhost:8080/api/iqueue/servicequeue/${this.serviceQueue.serviceQueueId}`)
      // this.httpService.delete(`https://localhost:8443/api/iqueue/servicequeue/${this.serviceQueue.serviceQueueId}`)
      .subscribe(responseData => {

        this.translateService.get('SERVICEQUEUE_DELETE_SUCCESS', { serviceQueueId: this.serviceQueue.serviceQueueId }).subscribe(text =>
          alert(text)
        )
        this.router.navigate([`/servicequeues`])
      },
        error => {
          this.translateService.get('SERVICEQUEUE_DELETE_ERROR').subscribe(text =>
            alert(`${text} ${this.serviceQueue.serviceQueueId}!`)
          )
        })
  }

  getServiceQueueTypes() {
    this.httpService
      .get(`http://localhost:8080/api/iqueue/servicequeuetype?languageId=${this.languageId}`)
      // .get(`https://localhost:8443/api/iqueue/servicequeuetype?languageId=${this.languageId}`)
      .subscribe(responseData => {
        for (const entry in responseData) {
          this.serviceQueueTypes.push(responseData[entry])
          console.log(responseData[entry])
        }
      })
  }

}
