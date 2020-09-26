import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './services/http-service'
import { TranslateService } from '@ngx-translate/core'
import { CookieService } from 'ngx-cookie-service'
import { UriBuilderService } from './services/uri-builder-service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {
  title = 'iqueue-web-app';
  loggedIn = false
  userId: string
  password: string
  userProfileId: number
  operatorId: number
  deskId: number

  readonly DEFAULT_LANGUAGE = 'en'

  constructor(private router: Router,
    private httpService: HttpService,
    private translateService: TranslateService,
    private cookieService: CookieService,
    private uriBuilderService: UriBuilderService) {
  }

  ngOnInit(): void {
    this.translateService.use(this.DEFAULT_LANGUAGE)
    this.getLanguage()
  }

  onLogin() {
    if (!this.userId || !this.password) {
      this.translateService.get('EMPTY_CREDENTIALS').subscribe(text =>
        alert(text)
      )
    } else {
      this.httpService
        .post(this.uriBuilderService.getLoginUri(), { userId: this.userId, password: this.password })
        .subscribe(response => {
          localStorage.setItem('userId', this.userId.toString())

          this.userProfileId = response['userProfileId']
          localStorage.setItem('userProfileId', this.userProfileId.toString())

          if (this.userProfileId == 2) {
            this.httpService
              .get(this.uriBuilderService.getUserOperatorsUri(this.userId))
              .subscribe(response => {
                this.operatorId = response[0]['operatorId']
                localStorage.setItem('operatorId', this.operatorId.toString())
              })
          }

          if (this.userProfileId == 3) {
            this.httpService
              .get(this.uriBuilderService.getUserDeskUri(this.userId))
              .subscribe(response => {
                console.log(response)
                this.deskId = response[0]['deskId']
                localStorage.setItem('deskId', this.deskId.toString())
              })
          }

          this.translateService
            .get('WELCOME_USER', { username: response['userName'] })
            .subscribe(text =>
              alert(text)
            )

          this.loggedIn = true
          this.router.navigate(['/home'])

        }, error => {
          console.log(error)
          switch (error['status']) {

            case 401:
              this.translateService.get('WRONG_CREDENTIALS').subscribe(text =>
                alert(text)
              )
              break

            case 404:
              this.translateService.get('USER_DONT_EXIST').subscribe(text =>
                alert(text)
              )
              break

            case 500:
              this.translateService.get('LOGIN_ERROR').subscribe(text =>
                alert(text)
              )
              break
          }
        })
    }

  }

  onLogout() {
    localStorage.clear()
    this.loggedIn = false
  }

  getLanguage() {
    const language = this.cookieService.get('languageDescription')
    if (language != undefined) {
      this.translateService.use(language)
    }
  }

}
