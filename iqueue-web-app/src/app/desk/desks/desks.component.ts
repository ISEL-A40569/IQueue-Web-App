import { Component, OnInit } from '@angular/core';
import { Desk } from '../../model/desk'
import { HttpService } from '../../services/http-service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-desks',
  templateUrl: './desks.component.html'
})
export class DesksComponent implements OnInit {
  desks: Desk[] = []
  fetching: boolean = false
  serviceQueueId: number

  constructor(private httpService: HttpService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.serviceQueueId = this.route.snapshot.params['serviceQueueId']
    this.getDesks()
  }

  getDesks() {
    let uri: string
    if (this.serviceQueueId) {
      uri = `https://localhost:8443/api/iqueue/desk?serviceQueueId=${this.serviceQueueId}`
    } else {
      uri = `https://localhost:8443/api/iqueue/desk`
    }

    this.fetching = true
    this.httpService.get(uri)
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
