import { Component, OnInit } from '@angular/core';
import { Desk } from '../../model/desk'
import { HttpService } from '../../services/http-service'
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core'
import { UriBuilderService } from '../../services/uri-builder-service'

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
    private translateService: TranslateService,
    private uriBuilderService: UriBuilderService) { }

  ngOnInit(): void {
    this.serviceQueueId = this.route.snapshot.params['serviceQueueId']
    this.getDesks()
  }

  getDesks() {
    let uri: string
    if (this.serviceQueueId) {
      uri = this.uriBuilderService.getServiceQueueDesks(this.serviceQueueId)
    } else {
      uri = this.uriBuilderService.getDesksUri()
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
