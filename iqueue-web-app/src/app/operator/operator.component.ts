import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http-service'
import { Operator } from '../model/operator'
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html'
})
export class OperatorComponent implements OnInit {
  operator: Operator = new Operator()
  createMode: boolean = true

  constructor(private httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService) { }

  ngOnInit(): void {
    if (this.route.snapshot.params['operatorId']) {
      this.createMode = false
      this.operator.operatorId = this.route.snapshot.params['operatorId']
      this.getOperator()
    }
  }

  getOperator() {
    this.httpService.get(`http://localhost:8080/api/iqueue/operator/${this.operator.operatorId}`)
      // this.httpService.get(`https://localhost:8443/api/iqueue/operator/${this.operator.operatorId}`)
      .subscribe(responseData => {
        this.operator.operatorDescription = responseData['operatorDescription']
        this.operator.email = responseData['email']
        this.operator.telephoneNumber = responseData['telephoneNumber']
        this.operator.address = responseData['address']
      })
  }

  onCreateOperator() {
    this.httpService.post('http://localhost:8080/api/iqueue/operator', this.operator).subscribe(responseData => {
      // this.httpService.post('https://localhost:8443/api/iqueue/operator', this.operator).subscribe(responseData => {
      this.operator.operatorId = responseData['operatorId']
      this.translateService.get('OPERATOR_CREATE_SUCCESS', { userId: this.operator.operatorId }).subscribe(text =>
        alert(text)
      )
      this.createMode = false
    },
      error => {
        this.translateService.get('OPERATOR_CREATE_ERROR').subscribe(text =>
          alert(`${text} ${this.operator.operatorId}!`)
        )
      })
  }

  onUpdateOperator() {
    this.httpService.update(`http://localhost:8080/api/iqueue/operator/${this.operator.operatorId}`,
      // this.httpService.update(`https://localhost:8443/api/iqueue/operator/${this.operator.operatorId}`,
      this.operator)
      .subscribe(responseData => {
        this.translateService.get('OPERATOR_UPDATE_SUCCESS', { userId: this.operator.operatorId }).subscribe(text =>
          alert(text)
        )
      },
        error => {
          this.translateService.get('OPERATOR_UPDATE_ERROR').subscribe(text =>
            alert(`${text} ${this.operator.operatorId}!`)
          )
        })
  }

  onDeleteOperator() {
    this.httpService.delete(`http://localhost:8080/api/iqueue/operator/${this.operator.operatorId}`)
      // this.httpService.delete(`https://localhost:8443/api/iqueue/operator/${this.operator.operatorId}`)
      .subscribe(responseData => {
        this.translateService.get('OPERATOR_DELETE_SUCCESS', { userId: this.operator.operatorId }).subscribe(text =>
          alert(text)
        )
        this.router.navigate(['/operators'])
      },
        error => {
          this.translateService.get('OPERATOR_DELETE_ERROR').subscribe(text =>
            alert(`${text} ${this.operator.operatorId}!`)
          )
        })
  }


}
