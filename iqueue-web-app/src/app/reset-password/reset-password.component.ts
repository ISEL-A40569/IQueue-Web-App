import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http-service'

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {
  userid: string
  password: string
  
  constructor(private httpService: HttpService) {

    }

  ngOnInit(): void {
    this.userid = localStorage.getItem('userId')
  }

  onChangePassword() {
    this.httpService
    .update(`http://localhost:8080/api/iqueue/user/${this.userid}/credentials`, 
    // .update(`https://localhost:8443/api/iqueue/user/${this.userid}/credentials`, 
    { userId: this.userid, password: this.password })
    .subscribe(response => {
      alert('Password changed with success')
    }, error => {
      alert('Error changing password')   
    })
  }

}
