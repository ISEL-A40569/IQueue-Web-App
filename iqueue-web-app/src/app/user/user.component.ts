import { Component, OnInit } from '@angular/core';
import { User } from '../model/user'
import { HttpService } from '../services/http-service'
import { ActivatedRoute, Router } from '@angular/router'
import { UserProfile } from '../model/user-profile'
import { CookieService } from 'ngx-cookie-service'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  user: User = new User()
  createMode: boolean = true
  userProfiles: UserProfile[] = []
  languageId: string

  constructor(private httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService,
    private translateService: TranslateService) { }

  ngOnInit(): void {
    if (this.route.snapshot.params['userId']) {
      this.createMode = false
      this.user.userId = this.route.snapshot.params['userId']
      this.getUser()
    }
    this.languageId = this.cookieService.get('languageId')
    if (!this.languageId)
      this.languageId = '1'

    this.getUserProfiles()
  }

  getUser() {
    this.httpService
      .get(`http://localhost:8080/api/iqueue/user/${this.user.userId}`)
      // .get(`https://localhost:8443/api/iqueue/user/${this.user.userId}`)
      .subscribe(responseData => {
        this.user.userName = responseData['userName']
        this.user.email = responseData['email']
        this.user.telephoneNumber = responseData['telephoneNumber']
        this.user.address = responseData['address']
        this.user.userProfileId = responseData['userProfileId']
      })
  }

  onCreateUser() {
    this.httpService
      .post(`http://localhost:8080/api/iqueue/user`, this.user)
      // .post(`https://localhost:8443/api/iqueue/user`, this.user)
      .subscribe(responseData => {
        this.user.userId = responseData['userId']

        this.translateService.get('USER_CREATE_SUCCESS', {userId : this.user.userId}).subscribe(text =>
          alert(text)
        )

        this.createMode = false
      },
        error => {
          this.translateService.get('USER_CREATE_ERROR').subscribe(text =>
            alert(`${text} ${this.user.userId}!`)
          )
        })
  }

  onUpdateUser() {
    this.httpService
      .update(`http://localhost:8080/api/iqueue/user/${this.user.userId}`,
        // .update(`https://localhost:8443/api/iqueue/user/${this.user.userId}`,
        this.user)
      .subscribe(responseData => {
        this.translateService.get('USER_UPDATE_SUCCESS', {userId : this.user.userId}).subscribe(text =>
          alert(text)
        )
      },
        error => {
          this.translateService.get('USER_UPDATE_ERROR').subscribe(text =>
            alert(`${text} ${this.user.userId}!`)
          )
        })
  }

  onDeleteUser() {
    this.httpService.delete(`http://localhost:8080/api/iqueue/user/${this.user.userId}`)
      // this.httpService.delete(`https://localhost:8443/api/iqueue/user/${this.user.userId}`)
      .subscribe(responseData => {
        this.translateService.get('USER_DELETE_SUCCESS', {userId : this.user.userId}).subscribe(text =>
          alert(text)
        )
        this.router.navigate([`/users`])
      },
        error => {
          this.translateService.get('USER_DELETE_ERROR').subscribe(text =>
            alert(`${text} ${this.user.userId}!`)
          )
        })
  }

  getUserProfiles() {
    this.httpService
      .get(`http://localhost:8080/api/iqueue/userprofile?languageId=${this.languageId}`)
      // .get(`https://localhost:8443/api/iqueue/userprofile?languageId=${this.languageId}`)
      .subscribe(responseData => {
        for (let entry in responseData) {
          this.userProfiles.push(responseData[entry])
        }
      })
  }

}

