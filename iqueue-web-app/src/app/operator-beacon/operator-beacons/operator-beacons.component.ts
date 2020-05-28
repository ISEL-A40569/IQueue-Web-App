import { Component, OnInit } from '@angular/core';
import { OperatorBeacon } from 'src/app/model/operator-beacon';
import { Beacon } from 'src/app/model/beacon';
import { HttpService } from '../../services/http-service'
import { ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.operatorId = this.route.snapshot.params['operatorId']
    this.getOperatorBeacons()
    this.getBeacons()
  }

  getOperatorBeacons() {
    this.fetching = true
    this.httpService.get(`https://localhost:8443/api/iqueue/operator/${this.operatorId}/beacon`)
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
    this.httpService.get('https://localhost:8443/api/iqueue/beacon')
      .subscribe(responseData => {
        for (const entry in responseData) {
          this.beacons.push(responseData[entry])
        }
      })
  }

  onAddBeacon() {
    let operatorBeacon: OperatorBeacon = new OperatorBeacon()
    operatorBeacon.operatorId = this.operatorId
    operatorBeacon.beaconId = this.beaconId

    this.httpService.post('https://localhost:8443/api/iqueue/operator/beacon', operatorBeacon)
      .subscribe(responseData => {
        alert(`Beacon ${this.beaconId} successfully added to operator ${this.operatorId}!`)
        this.operatorBeacons.push(operatorBeacon)
      },
        error => {
          alert(`Error adding beacon ${this.beaconId} to operator ${this.operatorId}!`)
        })
  }

}
