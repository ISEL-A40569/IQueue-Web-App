import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http-service'
import { TranslateService } from '@ngx-translate/core'
import { UriBuilderService } from '../services/uri-builder-service'

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {
  userid: string
  password: string

  constructor(private httpService: HttpService,
    private translateService: TranslateService,
    private uriBuilderService: UriBuilderService) {

  }

  ngOnInit(): void {
    this.userid = localStorage.getItem('userId')
  }

  onChangePassword() {
    this.httpService
      .update(this.uriBuilderService.getUserCredentialsUri(this.userid),
        { userId: this.userid, password: this.password })
      .subscribe(response => {
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
