import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  loggedIn = false
  userid: number
  password = ''

  title = 'iqueue-web-app';

  constructor(private router: Router) { }

  onLogin() {
    this.loggedIn = true
  }

  onLogout() {
    this.loggedIn = false
    // this.router.navigate(['/'])
  }
}
