import { Component, OnInit } from '@angular/core';
import { Operator } from 'src/app/model/operator';
import { HttpService } from '../../services/http-service'

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html'
})
export class OperatorsComponent implements OnInit {
  operators: Operator[] = []
  fetching: boolean = false

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.getOperators()
  }

  getOperators() {
    this.fetching = true
    this.httpService.get('http://localhost:8080/api/iqueue/operator')
    // this.httpService.get('https://localhost:8443/api/iqueue/operator')
      .subscribe(responseData => {
        for (const entry in responseData) {
          this.operators.push(responseData[entry])
        }
        this.fetching = false
      }, error => {
        this.fetching = false
      })
  }

}
