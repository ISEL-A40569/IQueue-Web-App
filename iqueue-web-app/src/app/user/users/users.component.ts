import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user'
import { HttpService } from '../../services/http-service'
import { UriBuilderService } from '../../services/uri-builder-service'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  users: User[] = []
  fetching: boolean = false

  readonly MANAGER_USER_PROFILE_ID = 2
  readonly SERVICE_USER_PROFILE_ID = 3

  constructor(private httpService: HttpService,
    private uriBuilderService: UriBuilderService) { }

  ngOnInit(): void {
    var userProfileId = localStorage.getItem('userProfileId')
    if (userProfileId == this.MANAGER_USER_PROFILE_ID.toString()) {
      this.getOperatorUsers()
    } else {
      this.getUsers()
    }    
  }

  getUsers() {
    this.fetching = true
    this.httpService.get(this.uriBuilderService.getUsersUri())
      .subscribe(responseData => {
        for (const entry in responseData) {
          this.users.push(responseData[entry])
        }
        this.fetching = false
      }, error => {
        this.fetching = false
      })
  }

  getOperatorUsers() {
    this.fetching = true
    var operatorId = localStorage.getItem('operatorId')
    this.httpService.get(this.uriBuilderService
      .getOperatorUsersWithUserProfileUri(parseInt(operatorId), this.SERVICE_USER_PROFILE_ID))
      .subscribe(responseData => {
        for (const entry in responseData) {
          this.users.push(responseData[entry])
        }
        this.fetching = false
      }, error => {
        this.fetching = false
      })
  }
}
