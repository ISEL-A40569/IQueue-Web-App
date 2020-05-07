import { Component, OnInit } from '@angular/core';
import { Desk } from '../../model/desk'
import { HttpService } from '../../services/http.service'

@Component({
  selector: 'app-desks',
  templateUrl: './desks.component.html'
})
export class DesksComponent implements OnInit {
  desks: Desk[] = []
  fetching: boolean = false

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.getDesks()
  }

  getDesks() {
    this.fetching = true
    this.httpService.get(`http://localhost:8080/api/iqueue/operator/servicequeue/desk`)
      .subscribe(responseData => {
        for (const entry in responseData) {
          this.desks.push(responseData[entry])
        }
        this.fetching = false
      }, error => {
        this.fetching = false
      })
  }
}
