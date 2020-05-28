import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login-service'

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

  constructor(private router: Router,
    private loginService: LoginService) { }

  onLogin() {
    this.loginService.authenticate(this.userid, this.password)
    this.loggedIn = true
    this.userProfileId = 1
  }

  onLogout() {
    this.loginService.authToken = ''
    this.loggedIn = false
    // this.router.navigate(['/'])
  }

}
