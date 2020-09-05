import { Component, OnInit } from '@angular/core';
import { Beacon } from '../model/beacon'
import { HttpService } from '../services/http-service'
import { ActivatedRoute, Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { UriBuilderService } from '../services/uri-builder-service'

@Component({
  selector: 'app-beacon',
  templateUrl: './beacon.component.html'
})
export class BeaconComponent implements OnInit {
  beacon: Beacon = new Beacon()
  createMode: boolean = true

  constructor(private httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService,
    private uriBuilderService: UriBuilderService) { }

  ngOnInit(): void {
    if (this.route.snapshot.params['beaconId']) {
      this.createMode = false
      this.beacon.beaconId = this.route.snapshot.params['beaconId']
      this.getBeacon()
    }
  }

  getBeacon() {
    this.httpService.get(this.uriBuilderService.getBeaconUri(this.beacon.beaconId))
      .subscribe(responseData => {
        this.beacon.beaconMacAddress = responseData['beaconMacAddress']
        this.beacon.namespaceId = responseData['namespaceId']
        this.beacon.instanceId = responseData['instanceId']
        this.beacon.manufacturer = responseData['manufacturer']
        this.beacon.model = responseData['model']
      })
  }

  onCreateBeacon() {
    this.httpService.post(this.uriBuilderService.getBeaconsUri(), this.beacon).subscribe(responseData => {
      this.beacon.beaconId = responseData['beaconId']
      this.translateService.get('BEACON_CREATE_SUCCESS', { userId: this.beacon.beaconId }).subscribe(text =>
        alert(text)
      )
      this.createMode = false
    },
      error => {
        this.translateService.get('BEACON_CREATE_ERROR').subscribe(text =>
          alert(`${text} ${this.beacon.beaconId}!`)
        )
      })
  }

  onUpdateBeacon() {
    this.httpService.update(this.uriBuilderService.getBeaconUri(this.beacon.beaconId),
      this.beacon)
      .subscribe(responseData => {
        this.translateService.get('BEACON_UPDATE_SUCCESS', { userId: this.beacon.beaconId }).subscribe(text =>
          alert(text)
        )
      },
        error => {
          this.translateService.get('BEACON_UPDATE_ERROR').subscribe(text =>
            alert(`${text} ${this.beacon.beaconId}!`)
          )
        })
  }

  onDeleteBeacon() {
    this.httpService.delete(this.uriBuilderService.getBeaconUri(this.beacon.beaconId))
      .subscribe(responseData => {
        this.translateService.get('BEACON_DELETE_SUCCESS', { userId: this.beacon.beaconId }).subscribe(text =>
          alert(text)
        )
        this.router.navigate(['/beacons'])
      },
        error => {
          this.translateService.get('BEACON_DELETE_ERROR').subscribe(text =>
            alert(`${text} ${this.beacon.beaconId}!`)
          )
        })
  }

}
