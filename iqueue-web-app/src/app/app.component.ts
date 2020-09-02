import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './services/http-service'
import { TranslateService } from '@ngx-translate/core'
import { CookieService } from 'ngx-cookie-service'

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

  constructor(private router: Router,
    private httpService: HttpService,
    private translateService: TranslateService,
    private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.translateService.use('en')
    this.getLanguage()
  }

  onLogin() {
    this.httpService
      // .post(`https://localhost:8443/api/iqueue/login`, { userId: this.userId, password: this.password })
      .post(`http://localhost:8080/api/iqueue/login`, { userId: this.userId, password: this.password })
      .subscribe(response => {
        localStorage.setItem('userId', this.userId.toString())

        this.userProfileId = response['userProfileId']
        localStorage.setItem('userProfileId', this.userProfileId.toString())

        if (this.userProfileId == 2) {
          this.httpService
            .get(`http://localhost:8080/api/iqueue/operator/user/${this.userId}`)
            // .get(`https://localhost:8443/api/iqueue/operator/user/${this.userId}`)
            .subscribe(response => {
              this.operatorId = response[0]['operatorId']
              localStorage.setItem('operatorId', this.operatorId.toString())
            })
        }

        if (this.userProfileId == 3) {
          this.httpService
            .get(`http://localhost:8080/api/iqueue/desk/user/${this.userId}`)
            // .get(`https://localhost:8443/api/iqueue/desk/user/${this.userId}`)
            .subscribe(response => {
              console.log(response)
              this.deskId = response[0]['deskId']
              localStorage.setItem('deskId', this.deskId.toString())
            })
        }
        
        this.translateService.get('WELCOME_USER').subscribe(text =>
          alert(`${text} ${response['userName']}`)
        )

        this.loggedIn = true

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

  onLogout() {
    localStorage.clear()
    this.loggedIn = false
    // this.router.navigate(['/'])
  }

  getLanguage() {
    const language = this.cookieService.get('languageDescription')
    if (language != undefined) {
      this.translateService.use(language)
    }
  }

}
