import { Component, OnInit } from '@angular/core';
import { OperatorBeacon } from 'src/app/model/operator-beacon';
import { Beacon } from 'src/app/model/beacon';
import { HttpService } from '../../services/http-service'
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-operator-beacons',
  templateUrl: './operator-beacons.component.html'
})

export class OperatorBeaconsComponent implements OnInit {
  operatorBeacons: OperatorBeacon[] = []
  fetching: boolean = false
  operatorId: number
  beaconId: number
  beacons: Beacon[] = []

  constructor(private httpService: HttpService,
    private route: ActivatedRoute,
    private translateService: TranslateService) { }

  ngOnInit(): void {
    this.operatorId = this.route.snapshot.params['operatorId']
    this.getOperatorBeacons()
    this.getBeacons()
  }

  getOperatorBeacons() {
    this.fetching = true
    this.httpService.get(`http://localhost:8080/api/iqueue/operator/${this.operatorId}/beacon`)
      // this.httpService.get(`https://localhost:8443/api/iqueue/operator/${this.operatorId}/beacon`)
      .subscribe(responseData => {
        for (const entry in responseData) {
          this.operatorBeacons.push(responseData[entry])
        }
        this.fetching = false
      }, error => {
        this.fetching = false
      })
  }

  getBeacons() {
    this.fetching = true
    this.httpService.get('http://localhost:8080/api/iqueue/beacon')
      // this.httpService.get('https://localhost:8443/api/iqueue/beacon')
      .subscribe(responseData => {
        for (const entry in responseData) {
          const beacon: Beacon = responseData[entry]
          if (!this.operatorBeacons.some(operatorBeacon => operatorBeacon.beaconId == beacon.beaconId))
            this.beacons.push(beacon)
        }
      })
  }

  onAddBeacon() {
    let operatorBeacon: OperatorBeacon = new OperatorBeacon()
    operatorBeacon.operatorId = this.operatorId
    operatorBeacon.beaconId = this.beaconId

    this.httpService.post('http://localhost:8080/api/iqueue/operator/beacon', operatorBeacon)
      // this.httpService.post('https://localhost:8443/api/iqueue/operator/beacon', operatorBeacon)
      .subscribe(responseData => {
        this.translateService.get('ADD_BEACON_OPERATOR_SUCCESS', {
          userId: this.beaconId,
          operatorId: this.operatorId
        }).subscribe(text =>
          alert(text)
        )
        this.operatorBeacons.push(operatorBeacon)
      },
        error => {
          this.translateService.get('ADD_BEACON_OPERATOR_ERROR', {
            userId: this.beaconId,
            operatorId: this.operatorId
          }).subscribe(text =>
            alert(text)
          )
        })
  }

}
