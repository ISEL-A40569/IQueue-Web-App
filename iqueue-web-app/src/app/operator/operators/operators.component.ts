import { Component, OnInit } from '@angular/core';
import { Operator } from 'src/app/model/operator';
import { HttpService } from '../../services/http.service'

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.css']
})
export class OperatorsComponent implements OnInit {
  operators: Operator[] = []
  operator: Operator = new Operator(null, null, null, null, null)
  fetching: boolean
  
  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.getOperators()
  }

  getOperators() {
    this.fetching = true
    this.httpService.get('http://localhost:8080/api/iqueue/operator').subscribe((responseData) => {
      for(const entry in responseData) {
        this.operators.push(responseData[entry])
      }      
    })
    this.fetching = false
  }

}
