import { Component, OnInit } from '@angular/core';
import { Desk } from '../model/desk'
import { ServiceQueue } from '../model/service-queue'
import { HttpService } from '../services/http-service'
import { ActivatedRoute, Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { UriBuilderService } from '../services/uri-builder-service'

@Component({
  selector: 'app-desk',
  templateUrl: './desk.component.html'
})
export class DeskComponent implements OnInit {
  desk: Desk = new Desk()
  createMode: boolean = true
  serviceQueues: ServiceQueue[] = []

  constructor(private httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService,
    private uriBuilderService: UriBuilderService) { }

  ngOnInit(): void {
    if (this.route.snapshot.params['deskId']) {
      this.createMode = false
      this.desk.deskId = this.route.snapshot.params['deskId']
      this.getDesk()
    }
    this.getServiceQueues()
  }

  getDesk() {
    this.httpService
      .get(this.uriBuilderService.getDeskUri(this.desk.deskId))
      .subscribe(responseData => {
        this.desk.serviceQueueId = responseData['serviceQueueId']
        this.desk.deskDescription = responseData['deskDescription']
      })
  }

  onCreateDesk() {
    this.httpService
      .post(this.uriBuilderService.getDesksUri(), this.desk)
      .subscribe(responseData => {
        this.desk.deskId = responseData['deskId']
        this.translateService.get('DESK_CREATE_SUCCESS', { userId: this.desk.deskId }).subscribe(text =>
          alert(text)
        )
        this.createMode = false
      },
        error => {
          this.translateService.get('DESK_CREATE_ERROR').subscribe(text =>
            alert(`${text} ${this.desk.deskId}!`)
          )
        })
  }

  onUpdateDesk() {
    this.httpService
      .update(this.uriBuilderService.getDeskUri(this.desk.deskId),
        this.desk)
      .subscribe(responseData => {
        this.translateService.get('DESK_UPDATE_SUCCESS', { userId: this.desk.deskId }).subscribe(text =>
          alert(text)
        )
      },
        error => {
          this.translateService.get('DESK_UPDATE_ERROR').subscribe(text =>
            alert(`${text} ${this.desk.deskId}!`)
          )
        })
  }

  onDeleteDesk() {
    this.httpService
      .delete(this.uriBuilderService.getDeskUri(this.desk.deskId))
      .subscribe(responseData => {
        this.translateService.get('DESK_DELETE_SUCCESS', { userId: this.desk.deskId }).subscribe(text =>
          alert(text)
        )
        this.router.navigate([`/desks`])
      },
        error => {
          this.translateService.get('DESK_DELETE_ERROR').subscribe(text =>
            alert(`${text} ${this.desk.deskId}!`)
          )
        })
  }

  getServiceQueues() {
    const operatorId = localStorage.getItem('operatorId')
    this.httpService.get(`http://localhost:8080/api/iqueue/servicequeue?operatorId=${operatorId}`)
      // this.httpService.get(`https://localhost:8443/api/iqueue/servicequeue?operatorId=${operatorId}`)
      .subscribe(responseData => {
        for (const entry in responseData) {
          this.serviceQueues.push(responseData[entry])
        }
      })
  }

}
