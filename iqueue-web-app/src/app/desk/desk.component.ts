import { Component, OnInit } from '@angular/core';
import { Desk } from '../model/desk'
import { HttpService } from '../services/http.service'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-desk',
  templateUrl: './desk.component.html'
})
export class DeskComponent implements OnInit {
  desk: Desk = new Desk()
  createMode: boolean = true

  constructor(private httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (this.route.snapshot.params['deskId']) {
      this.createMode = false
      this.desk.deskId = this.route.snapshot.params['deskId']
      this.getDesk()
    }
  }

  getDesk() {
    this.httpService
      .get(`http://localhost:8080/api/iqueue/operator/servicequeue/desk/${this.desk.deskId}`)
      .subscribe(responseData => {
        this.desk.operatorId = responseData['operatorId']
        this.desk.serviceQueueId = responseData['serviceQueueId']
        this.desk.deskDescription = responseData['deskDescription']
      })
  }

  onCreateDesk() {
    this.httpService
      .post(`http://localhost:8080/api/iqueue/operator/servicequeue/desk`, this.desk)
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
      .update(`http://localhost:8080/api/iqueue/operator/servicequeue/desk/${this.desk.deskId}`,
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
      .delete(`http://localhost:8080/api/iqueue/operator/${this.desk.operatorId}/servicequeue/${this.desk.serviceQueueId}/desk/${this.desk.deskId}`)
      .subscribe(responseData => {
        alert(`Desk with id ${this.desk.deskId} successfully deleted!`)
        this.router.navigate([`/desks`])
      },
        error => {
          alert(`Error deleting Desk ${this.desk.deskId}!`)
        })
  }

}
