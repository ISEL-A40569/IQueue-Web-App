import { Component, OnInit } from '@angular/core';
import { Desk } from '../../model/desk'
import { HttpService } from '../../services/http-service'
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-desks',
  templateUrl: './desks.component.html'
})
export class DesksComponent implements OnInit {
  desks: Desk[] = []
  fetching: boolean = false
  serviceQueueId: number

  constructor(private httpService: HttpService,
    private route: ActivatedRoute,
    private translateService: TranslateService) { }

  ngOnInit(): void {
    this.serviceQueueId = this.route.snapshot.params['serviceQueueId']
    this.getDesks()
  }

  getDesks() {
    let uri: string
    if (this.serviceQueueId) {
      uri = `http://localhost:8080/api/iqueue/desk?serviceQueueId=${this.serviceQueueId}`
      // uri = `https://localhost:8443/api/iqueue/desk?serviceQueueId=${this.serviceQueueId}`
    } else {
      uri = `http://localhost:8080/api/iqueue/desk`
      // uri = `https://localhost:8443/api/iqueue/desk`
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
