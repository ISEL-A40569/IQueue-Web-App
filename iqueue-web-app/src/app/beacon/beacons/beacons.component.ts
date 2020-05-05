import { Component, OnInit } from '@angular/core';
import { Beacon } from 'src/app/model/beacon';
import { HttpService } from '../../services/http.service'

@Component({
  selector: 'app-beacons',
  templateUrl: './beacons.component.html',
  styleUrls: ['./beacons.component.css']
})
export class BeaconsComponent implements OnInit {
  beacons: Beacon[] = []
  fetching: boolean

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
  }

  getOperators() {
    this.fetching = true
    this.httpService.get('http://localhost:8080/api/iqueue/beacon')
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
