import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
    private httpService: HttpService) { }

  onLogin() {
    this.httpService
      .post(`https://localhost:8443/api/iqueue/login`, { userId: this.userid, password: this.password })
      .subscribe(response => {

        this.userProfileId = response['userProfileId']

        if (this.userProfileId == 2) {
          this.httpService
            .get(`https://localhost:8443/api/iqueue/operator/user/${this.userid}`)
            .subscribe(response => {
              this.operatorId = response['operatorId']
            })
        }

        if (this.userProfileId == 3) {
          this.httpService
            .get(`https://localhost:8443/api/iqueue/desk/user/${this.userid}`)
            .subscribe(response => {
              this.deskId = response['deskId']
            })
        }

        alert(`Welcome ${response['userName']}`)
        this.loggedIn = true

      }, error => {
        console.log(error)
        switch (error['status']) {
          case 401: alert('Wrong credentials!')
            break

          case 404: alert('User does not exist!')
            break

          case 500: alert('Error logging in!')
            break
        }
      })
  }

  onLogout() {
    this.loggedIn = false
    // this.router.navigate(['/'])
  }

}
