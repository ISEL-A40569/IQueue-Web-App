import { Component, OnInit } from '@angular/core';
import { User } from '../model/user'
import { HttpService } from '../services/http-service'
import { ActivatedRoute, Router } from '@angular/router'
import { UserProfile } from '../model/user-profile'
import { CookieService } from 'ngx-cookie-service'
import { TranslateService } from '@ngx-translate/core'
import { UriBuilderService } from '../services/uri-builder-service'
import { OperatorUser } from '../model/operator-user'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  user: User = new User()
  createMode: boolean = true
  userProfiles: UserProfile[] = []
  languageId: string
  currentUserProfileId: number

  readonly DEFAULT_LANGUAGE_ID = '1'

  readonly ADMINISTRATOR_USER_PROFILE_ID = 1
  readonly MANAGER_USER_PROFILE_ID = 2
  readonly SERVICE_USER_PROFILE_ID = 3

  constructor(private httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService,
    private translateService: TranslateService,
    private uriBuilderService: UriBuilderService) { }

  ngOnInit(): void {
    this.currentUserProfileId = parseInt(localStorage.getItem('userProfileId'))
    if (this.route.snapshot.params['userId']) {      
      this.user.userId = this.route.snapshot.params['userId']
      this.getUser()
    }
    this.languageId = this.cookieService.get('languageId')
    if (!this.languageId)
      this.languageId = this.DEFAULT_LANGUAGE_ID

    this.getUserProfiles()
  }

  getUser() {
    this.httpService
      .get(this.uriBuilderService.getUserUri(this.user.userId.toString()))
      .subscribe(responseData => {
        this.user.userName = responseData['userName']
        this.user.email = responseData['email']
        this.user.telephoneNumber = responseData['telephoneNumber']
        this.user.address = responseData['address']
        this.user.userProfileId = responseData['userProfileId']
        this.createMode = false
      })
  }

  onCreateUser() {
    this.httpService
      .post(this.uriBuilderService.getUsersUri(), this.user)
      .subscribe(responseData => {
        this.user.userId = responseData['userId']

        // If it's a Manager Creating a Service User, associate it to the Operator
        if (this.currentUserProfileId == this.MANAGER_USER_PROFILE_ID &&
          this.user.userProfileId == this.SERVICE_USER_PROFILE_ID) {
            this.addUserToOperator(this.user.userId)
          }

        this.translateService.get('USER_CREATE_SUCCESS', { userId: this.user.userId }).subscribe(text =>
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
      .update(this.uriBuilderService.getUserUri(this.user.userId.toString()),
        this.user)
      .subscribe(responseData => {
        this.translateService.get('USER_UPDATE_SUCCESS', { userId: this.user.userId }).subscribe(text =>
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
    this.httpService.delete(this.uriBuilderService.getUserUri(this.user.userId.toString()))
      .subscribe(responseData => {
        this.translateService.get('USER_DELETE_SUCCESS', { userId: this.user.userId }).subscribe(text =>
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
      .get(this.uriBuilderService.getUserProfileUri(this.languageId))
      .subscribe(responseData => {
        for (let entry in responseData) {
          this.userProfiles.push(responseData[entry])
        }

        if (this.currentUserProfileId == this.ADMINISTRATOR_USER_PROFILE_ID) {
          this.userProfiles = this.userProfiles
          .filter(userProfile => userProfile.userProfileId != this.SERVICE_USER_PROFILE_ID)
        }

        if (this.currentUserProfileId == this.MANAGER_USER_PROFILE_ID) {
          this.userProfiles = this.userProfiles
            .filter(userProfile => userProfile.userProfileId == this.SERVICE_USER_PROFILE_ID)
        }
      })
  }

  addUserToOperator(userId: number) {
    let operatorUser: OperatorUser = new OperatorUser()
    let operatorId = localStorage.getItem('operatorId')
    operatorUser.operatorId = parseInt(operatorId)
    operatorUser.userId = userId

    this.httpService.post(this.uriBuilderService.getOperatorsUsersUri(), operatorUser)
      .subscribe(responseData => {
      },
        error => {
        })
  }

}

