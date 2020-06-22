import { Component, OnInit } from '@angular/core';
import { Desk } from '../model/desk'
import { ServiceQueue } from '../model/service-queue'
import { HttpService } from '../services/http-service'
import { ActivatedRoute, Router } from '@angular/router'

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
    private router: Router) { }

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
      .get(`https://localhost:8443/api/iqueue/desk/${this.desk.deskId}`)
      .subscribe(responseData => {
        this.desk.serviceQueueId = responseData['serviceQueueId']
        this.desk.deskDescription = responseData['deskDescription']
      })
  }

  onCreateDesk() {
    this.httpService
      .post(`https://localhost:8443/api/iqueue/desk`, this.desk)
      .subscribe(responseData => {
        this.desk.deskId = responseData['deskId']
        alert(`Desk successfully created with id ${this.desk.deskId}!`)
        this.createMode = false
      },
        error => {
          alert('Error creating Desk!')
        })
  }

  onUpdateDesk() {
    this.httpService
      .update(`https://localhost:8443/api/iqueue/desk/${this.desk.deskId}`,
        this.desk)
      .subscribe(responseData => {
        alert(`Desk with id ${this.desk.deskId} successfully updated!`)
      },
        error => {
          alert(`Error updating Desk ${this.desk.deskId}!`)
        })
  }

  onDeleteDesk() {
    this.httpService
      .delete(`https://localhost:8443/api/iqueue/desk/${this.desk.deskId}`)
      .subscribe(responseData => {
        alert(`Desk with id ${this.desk.deskId} successfully deleted!`)
        this.router.navigate([`/desks`])
      },
        error => {
          alert(`Error deleting Desk ${this.desk.deskId}!`)
        })
  }

  getServiceQueues() {
    const operatorId = localStorage.getItem('operatorId')
    this.httpService.get(`https://localhost:8443/api/iqueue/servicequeue?operatorId=${operatorId}`)
      .subscribe(responseData => {
        for (const entry in responseData) {
          this.serviceQueues.push(responseData[entry])
        }
      })
  }

}
