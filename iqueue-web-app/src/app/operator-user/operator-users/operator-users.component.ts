import { Component, OnInit } from '@angular/core';
import { OperatorUser } from 'src/app/model/operator-user';
import { User } from 'src/app/model/user';
import { HttpService } from '../../services/http-service'
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core'
import { UriBuilderService } from '../../services/uri-builder-service'

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

  readonly MANAGER_PROFILE_ID = 2

  constructor(private httpService: HttpService,
    private route: ActivatedRoute,
    private translateService: TranslateService,
    private uriBuilderService: UriBuilderService) { }

  ngOnInit(): void {
    this.operatorId = this.route.snapshot.params['operatorId']
    this.getOperatorUsers()
    this.getUsers()
  }

  getOperatorUsers() {
    this.fetching = true
    this.httpService.get(this.uriBuilderService
      .getOperatorUsersWithUserProfileUri(this.operatorId, this.MANAGER_PROFILE_ID))
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
    this.httpService.get(this.uriBuilderService.getUsersUri())
      .subscribe(responseData => {
        for (const entry in responseData) {
          const user: User = responseData[entry]
          if (user.userProfileId == this.MANAGER_PROFILE_ID &&
            !this.operatorUsers.some(operatorUser => operatorUser.userId == user.userId))
            this.users.push(user)
        }
      })
  }

  onAddUser() {
    let operatorUser: OperatorUser = new OperatorUser()
    operatorUser.operatorId = this.operatorId
    operatorUser.userId = this.userId

    this.httpService.post(this.uriBuilderService.getOperatorsUsersUri(), operatorUser)
      .subscribe(responseData => {
        this.translateService.get('ADD_USER_OPERATOR_SUCCESS', {
          userId: this.userId,
          operatorId: this.operatorId
        }).subscribe(text =>
          alert(text)
        )
        this.operatorUsers.push(operatorUser)
      },
        error => {
          this.translateService.get('ADD_USER_OPERATOR_ERROR', {
            userId: this.userId,
            operatorId: this.operatorId
          }).subscribe(text =>
            alert(text)
          )
        })
  }
}
