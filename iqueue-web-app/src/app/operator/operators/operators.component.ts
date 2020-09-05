import { Component, OnInit } from '@angular/core';
import { Operator } from 'src/app/model/operator';
import { HttpService } from '../../services/http-service'
import { UriBuilderService } from '../../services/uri-builder-service'

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html'
})
export class OperatorsComponent implements OnInit {
  operators: Operator[] = []
  fetching: boolean = false

  constructor(private httpService: HttpService,
    private uriBuilderService: UriBuilderService) { }

  ngOnInit(): void {
    this.getOperators()
  }

  getOperators() {
    this.fetching = true
    this.httpService.get(this.uriBuilderService.getOperatorsBeaconsUri())
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
