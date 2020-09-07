import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http-service'
import { OperatorBeacon } from 'src/app/model/operator-beacon';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core'
import { UriBuilderService } from '../services/uri-builder-service'

@Component({
  selector: 'app-operator-beacon',
  templateUrl: './operator-beacon.component.html'
})

export class OperatorBeaconComponent implements OnInit {
  operatorBeacon: OperatorBeacon = new OperatorBeacon()

  constructor(private httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService,
    private uriBuilderService: UriBuilderService) { }

  ngOnInit(): void {
    this.operatorBeacon.operatorId = this.route.snapshot.params['operatorId']
    this.operatorBeacon.beaconId = this.route.snapshot.params['beaconId']
  }

  onRemoveBeacon() {
    this.httpService.delete(this.uriBuilderService.getOperatorBeaconUri(this.operatorBeacon.operatorId,
      this.operatorBeacon.beaconId))
    .subscribe(responseData => {
      this.translateService.get('REMOVE_BEACON_OPERATOR_SUCCESS', {
        beaconId: this.operatorBeacon.beaconId,
        operatorId: this.operatorBeacon.operatorId
      }).subscribe(text =>
        alert(text)
      )
        this.router.navigate([`/operator/${this.operatorBeacon.operatorId}/beacon`])
      },
        error => {
          this.translateService.get('REMOVE_BEACON_OPERATOR_ERROR', {
            beaconId: this.operatorBeacon.beaconId,
            operatorId: this.operatorBeacon.operatorId
          }).subscribe(text =>
            alert(text)
          )
        })
  }

}
