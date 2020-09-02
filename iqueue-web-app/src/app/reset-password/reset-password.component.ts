import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http-service'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {
  userid: string
  password: string

  constructor(private httpService: HttpService,
    private translateService: TranslateService) {

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
        this.translateService.get('SERVICEQUEUE_CREATE_ERROR').subscribe(text =>
          alert(text)
        )
        this.translateService.get('CHANGE_PASSWORD_SUCCESS').subscribe(text =>
          alert(text)
        )
      }, error => {
        this.translateService.get('CHANGE_PASSWORD_ERROR').subscribe(text =>
          alert(text)
        )
      })
  }

}
