import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service'
import { Operator } from '../model/operator'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.css']
})
export class OperatorComponent implements OnInit {
  operatorId: number
  operator: Operator = new Operator(null, null, null, null, null)
  editMode: boolean

  constructor(private httpService: HttpService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    if(this.route.snapshot.params['operatorId']) {
      this.editMode = true
      this.operatorId = this.route.snapshot.params['operatorId']
      this.getOperator()
    }
  }


  getOperator() {
    this.httpService.get('http://localhost:8080/api/iqueue/operator/' + this.operatorId)
        .subscribe(responseData => {
          this.operator = new Operator(this.operatorId,
            responseData['operatorDescription'],
            responseData['email'],
            responseData['phoneNumber'],
            responseData['address'])
        })
  }

  onCreateOperator() {
    this.operator = new Operator(null, this.operator.operatorDescription,
      this.operator.email, this.operator.phoneNumber, this.operator.address)
    this.httpService.post('http://localhost:8080/api/iqueue/operator', this.operator).subscribe( responseData => {
          this.operator.operatorId = responseData['operatorId']
          alert('Operator successfully created with id ' + this.operator.operatorId + '!')
          this.operatorId = this.operator.operatorId
          this.editMode = true
        },
        error => {
            alert('Error creating Operator!')
      } )
  }

  onUpdateOperator() {
    this.httpService.update('http://localhost:8080/api/iqueue/operator/' + this.operatorId, new Operator(null, this.operator.operatorDescription,
      this.operator.email, this.operator.phoneNumber, this.operator.address))
          .subscribe( responseData => {
            alert('Operator with id ' + this.operator.operatorId + 'successfully updated!')
        },
        error => {
            alert('Error updating Operator ' + this.operator.operatorId + '!')
        } )
  }

  onDeleteOperator() {
    this.httpService.delete('http://localhost:8080/api/iqueue/operator/' + this.operator.operatorId)
        .subscribe( responseData => {
          alert('Operator with id ' + this.operator.operatorId + 'successfully deleted!')
          this.router.navigate(['/operators'])
        },
        error => {
            alert('Error deleting Operator ' + this.operator.operatorId + '!')
        } )
  }

  
}
