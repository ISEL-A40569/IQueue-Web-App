import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http-service'
import { OperatorBeacon } from 'src/app/model/operator-beacon';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-operator-beacon',
  templateUrl: './operator-beacon.component.html'
})

export class OperatorBeaconComponent implements OnInit {
  operatorBeacon: OperatorBeacon = new OperatorBeacon()

  constructor(private httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.operatorBeacon.operatorId = this.route.snapshot.params['operatorId']
    this.operatorBeacon.beaconId = this.route.snapshot.params['beaconId']
  }

  onRemoveBeacon() {
    this.httpService.delete(`http://localhost:8080/api/iqueue/operator/${this.operatorBeacon.operatorId}/beacon/${this.operatorBeacon.beaconId}`)
    // this.httpService.delete(`https://localhost:8443/api/iqueue/operator/${this.operatorBeacon.operatorId}/beacon/${this.operatorBeacon.beaconId}`) 
    .subscribe(responseData => {
        alert(`Beacon ${this.operatorBeacon.beaconId} successfully removed from operator ${this.operatorBeacon.operatorId} !`)
        this.router.navigate([`/operator/${this.operatorBeacon.operatorId}/beacon`])
      },
        error => {
          alert(`Error removing beacon ${this.operatorBeacon.beaconId} from operator ${this.operatorBeacon.operatorId}!`)
        })
  }

}
