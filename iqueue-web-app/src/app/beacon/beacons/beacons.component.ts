import { Component, OnInit } from '@angular/core';
import { Beacon } from 'src/app/model/beacon';
import { HttpService } from '../../services/http-service'
import { UriBuilderService } from '../../services/uri-builder-service'

@Component({
  selector: 'app-beacons',
  templateUrl: './beacons.component.html'
})
export class BeaconsComponent implements OnInit {
  beacons: Beacon[] = []
  fetching: boolean

  constructor(private httpService: HttpService,
    private uriBuilderService: UriBuilderService) { }

  ngOnInit(): void {
    this.getBeacons()
  }

  getBeacons() {
    this.fetching = true
    this.httpService.get(this.uriBuilderService.getBeaconsUri())
      .subscribe(responseData => {
        for (const entry in responseData) {
          this.beacons.push(responseData[entry])
        }
        this.fetching = false
      }, error => {
        this.fetching = false
      })
  }

}
