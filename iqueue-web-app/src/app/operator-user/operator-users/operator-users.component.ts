import { Component, OnInit } from '@angular/core';
import { OperatorUser } from 'src/app/model/operator-user';
import { User } from 'src/app/model/user';
import { HttpService } from '../../services/http-service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-operator-users',
  templateUrl: './operator-users.component.html'
})
export class OperatorUsersComponent implements OnInit {
  operatorUsers: OperatorUser[] = []
  fetching: boolean = false
  operatorId: number
  userId: number
  users: User[] = []

  constructor(private httpService: HttpService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.operatorId = this.route.snapshot.params['operatorId']
    this.getOperatorUsers()
    this.getUsers()
  }

  getOperatorUsers() {
    this.fetching = true
    this.httpService.get(`https://localhost:8443/api/iqueue/operator/${this.operatorId}/user`)
      .subscribe(responseData => {
        for (const entry in responseData) {
          this.operatorUsers.push(responseData[entry])
        }
        this.fetching = false
      }, error => {
        this.fetching = false
      })
  }

  getUsers() {
    this.fetching = true
    this.httpService.get('https://localhost:8443/api/iqueue/user')
      .subscribe(responseData => {
        for (const entry in responseData) {
          this.users.push(responseData[entry])
        }
      })
  }

  onAddUser() {
    let operatorUser: OperatorUser = new OperatorUser()
    operatorUser.operatorId = this.operatorId
    operatorUser.userId = this.userId

    this.httpService.post('https://localhost:8443/api/iqueue/operator/user', operatorUser)
      .subscribe(responseData => {
        alert(`User ${this.userId} successfully added to operator ${this.operatorId}!`)
        this.operatorUsers.push(operatorUser)
      },
        error => {
          alert(`Error adding user ${this.userId} to operator ${this.operatorId}!`)
        })
  }
}
