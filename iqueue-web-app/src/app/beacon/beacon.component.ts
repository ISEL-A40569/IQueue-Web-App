import { Component, OnInit } from '@angular/core';
import { Beacon } from '../model/beacon'
import { HttpService } from '../services/http-service'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-beacon',
  templateUrl: './beacon.component.html'
})
export class BeaconComponent implements OnInit {
  beacon: Beacon = new Beacon()
  createMode: boolean = true

  constructor(private httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (this.route.snapshot.params['beaconId']) {
      this.createMode = false
      this.beacon.beaconId = this.route.snapshot.params['beaconId']
      this.getBeacon()
    }
  }

  getBeacon() {
    this.httpService.get(`http://localhost:8080/api/iqueue/beacon/${this.beacon.beaconId}`)
    // this.httpService.get(`https://localhost:8443/api/iqueue/beacon/${this.beacon.beaconId}`)
      .subscribe(responseData => {
        this.beacon.beaconMacAddress = responseData['beaconMacAddress']
        this.beacon.namespaceId = responseData['namespaceId']
        this.beacon.instanceId = responseData['instanceId']
        this.beacon.manufacturer = responseData['manufacturer']
        this.beacon.model = responseData['model']
      })
  }

  onCreateBeacon() {
    this.httpService.post('http://localhost:8080/api/iqueue/beacon', this.beacon).subscribe(responseData => {
      // this.httpService.post('https://localhost:8443/api/iqueue/beacon', this.beacon).subscribe(responseData => {
      this.beacon.beaconId = responseData['beaconId']
      alert(`Beacon successfully created with id ${this.beacon.beaconId}!`)
      this.createMode = false
    },
      error => {
        alert('Error creating Beacon!')
      })
  }

  onUpdateBeacon() {
    this.httpService.update(`http://localhost:8080/api/iqueue/beacon/${this.beacon.beaconId}`,
    // this.httpService.update(`https://localhost:8443/api/iqueue/beacon/${this.beacon.beaconId}`,
      this.beacon)
      .subscribe(responseData => {
        alert(`Beacon with id ${this.beacon.beaconId} successfully updated!`)
      },
        error => {
          alert(`Error updating Beacon ${this.beacon.beaconId}!`)
        })
  }

  onDeleteBeacon() {
    this.httpService.delete(`http://localhost:8080/api/iqueue/beacon/${this.beacon.beaconId}`)
    // this.httpService.delete(`https://localhost:8443/api/iqueue/beacon/${this.beacon.beaconId}`)
    .subscribe(responseData => {
        alert(`Beacon with id ${this.beacon.beaconId} successfully deleted!`)
        this.router.navigate(['/beacons'])
      },
        error => {
          alert(`Error deleting Beacon ${this.beacon.beaconId}!`)
        })
  }

}
