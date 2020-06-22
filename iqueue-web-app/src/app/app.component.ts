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
  userId: string
  password: string
  userProfileId: number
  operatorId: number
  deskId: number

  constructor(private router: Router,
    private httpService: HttpService) { }

  onLogin() {
    this.httpService
      .post(`https://localhost:8443/api/iqueue/login`, { userId: this.userId, password: this.password })
      .subscribe(response => {
        localStorage.setItem('userId', this.userId.toString())

        this.userProfileId = response['userProfileId']
        localStorage.setItem('userProfileId', this.userProfileId.toString())

        if (this.userProfileId == 2) {
          this.httpService
            .get(`https://localhost:8443/api/iqueue/operator/user/${this.userId}`)
            .subscribe(response => {              
              this.operatorId = response[0]['operatorId']
              localStorage.setItem('operatorId', this.operatorId.toString())
            })
        }

        if (this.userProfileId == 3) {
          this.httpService
            .get(`https://localhost:8443/api/iqueue/desk/user/${this.userId}`)
            .subscribe(response => {
              this.deskId = response['deskId']
              localStorage.setItem('deskId', this.deskId.toString())
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
    localStorage.clear()
    this.loggedIn = false
    // this.router.navigate(['/'])
  }

}
