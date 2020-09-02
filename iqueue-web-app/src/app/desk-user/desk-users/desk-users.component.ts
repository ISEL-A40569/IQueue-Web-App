import { Component, OnInit } from '@angular/core';
import { DeskUser } from 'src/app/model/desk-user';
import { User } from 'src/app/model/user';
import { HttpService } from '../../services/http-service'
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-desk-users',
  templateUrl: './desk-users.component.html'
})
export class DeskUsersComponent implements OnInit {
  deskUsers: DeskUser[] = []
  fetching: boolean = false
  deskId: number
  userId: number
  users: User[] = []

  constructor(private httpService: HttpService,
    private route: ActivatedRoute,
    private translateService: TranslateService) { }

  ngOnInit(): void {
    this.deskId = this.route.snapshot.params['deskId']
    this.getDeskUsers()
    this.getUsers()
  }

  getDeskUsers() {
    this.fetching = true
    this.httpService.get(`http://localhost:8080/api/iqueue/desk/${this.deskId}/user`)
      // this.httpService.get(`https://localhost:8443/api/iqueue/desk/${this.deskId}/user`)
      .subscribe(responseData => {
        for (const entry in responseData) {
          this.deskUsers.push(responseData[entry])
        }
        this.fetching = false
      }, error => {
        this.fetching = false
      })
  }

  getUsers() {
    this.fetching = true
    this.httpService.get('http://localhost:8080/api/iqueue/user')
      // this.httpService.get('https://localhost:8443/api/iqueue/user')
      .subscribe(responseData => {
        for (const entry in responseData) {
          const user: User = responseData[entry]
          if (user.userProfileId == 3 && !this.deskUsers.some(deskUser => deskUser.userId == user.userId))
            this.users.push(user)
        }
      })
  }

  onAddUser() {
    let deskUser: DeskUser = new DeskUser()
    deskUser.deskId = this.deskId
    deskUser.userId = this.userId

    this.httpService.post('http://localhost:8080/api/iqueue/desk/user', deskUser)
      // this.httpService.post('https://localhost:8443/api/iqueue/desk/user', deskUser)
      .subscribe(responseData => {
        this.translateService.get('ADD_USER_DESK_SUCCESS', {
          userId: this.userId,
          operatorId: this.deskId
        }).subscribe(text =>
          alert(text)
        )
        this.deskUsers.push(deskUser)
      },
        error => {
          this.translateService.get('ADD_USER_DESK_ERROR', {
            userId: this.userId,
            operatorId: this.deskId
          }).subscribe(text =>
            alert(text)
          )
        })
  }

}
