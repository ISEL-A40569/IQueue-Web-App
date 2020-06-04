import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login-service'
import { HttpService } from './services/http-service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'iqueue-web-app';
  loggedIn = false
  userid: string
  password: string
  userProfileId: number
  operatorId: number
  deskId: number

  constructor(private router: Router,
    private loginService: LoginService,
    private httpService: HttpService) { }

  onLogin() {
    this.loginService.authenticate(this.userid, this.password)

    this.httpService
      .post(`https://localhost:8443/api/iqueue/login`, { userId: this.userid, password: this.password })
      .subscribe(response => {

        console.log(response)

        this.userProfileId = response['userProfileId']

        if (this.userProfileId == 2) {
          // TODO: get operator
        }

        if (this.userProfileId == 3) {
          // TODO: get desk
        }

        alert(`Welcome ${response['userName']}`)
        this.loggedIn = true
      }, error => {
        switch (error) {
          case 401: alert('Wrong credentials!')
            break

          case 404: alert('User does not exist!')
            break

          case 500: alert('Server is unavailable!')
            break
        }

      })
  }

  onLogout() {
    this.loginService.authToken = ''
    this.loggedIn = false
    // this.router.navigate(['/'])
  }

}
