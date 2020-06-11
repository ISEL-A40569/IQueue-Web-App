import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http-service'
import { Operator } from '../model/operator'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html'
})
export class OperatorComponent implements OnInit {
  operator: Operator = new Operator() 
  createMode: boolean = true

  constructor(private httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (this.route.snapshot.params['operatorId']) {
      this.createMode = false
      this.operator.operatorId = this.route.snapshot.params['operatorId']
      this.getOperator()
    }
  }

  getOperator() {
    this.httpService.get(`https://localhost:8443/api/iqueue/operator/${this.operator.operatorId}`)
      .subscribe(responseData => {
        this.operator.operatorDescription = responseData['operatorDescription']
        this.operator.email = responseData['email']
        this.operator.telephoneNumber = responseData['telephoneNumber']
        this.operator.address = responseData['address']
      })
  }

  onCreateOperator() {
    this.httpService.post('https://localhost:8443/api/iqueue/operator', this.operator).subscribe(responseData => {
      this.operator.operatorId = responseData['operatorId']
      alert(`Operator successfully created with id ${this.operator.operatorId}!`)
      this.createMode = false
    },
      error => {
        alert('Error creating Operator!')
      })
  }

  onUpdateOperator() {
    this.httpService.update(`https://localhost:8443/api/iqueue/operator/${this.operator.operatorId}`,
      this.operator)
      .subscribe(responseData => {
        alert(`Operator with id ${this.operator.operatorId} successfully updated!`)
      },
        error => {
          alert(`Error updating Operator ${this.operator.operatorId}!`)
        })
  }

  onDeleteOperator() {
    this.httpService.delete(`https://localhost:8443/api/iqueue/operator/${this.operator.operatorId}`)
      .subscribe(responseData => {
        alert(`Operator with id ${this.operator.operatorId} successfully deleted!`)
        this.router.navigate(['/operators'])
      },
        error => {
          alert(`Error deleting Operator ${this.operator.operatorId}!`)
        })
  }


}
