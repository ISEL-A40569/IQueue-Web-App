import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http-service'
import { DeskUser } from 'src/app/model/desk-user';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core'
import { UriBuilderService } from '../services/uri-builder-service'

@Component({
  selector: 'app-desk-user',
  templateUrl: './desk-user.component.html'
})
export class DeskUserComponent implements OnInit {
  deskUser: DeskUser = new DeskUser()

  constructor(private httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService,
    private uriBuilderService: UriBuilderService) { }

  ngOnInit(): void {
    this.deskUser.deskId = this.route.snapshot.params['deskId']
    this.deskUser.userId = this.route.snapshot.params['userId']
  }

  onRemoveUser() {
    this.httpService.delete(this.uriBuilderService.getDeskUserUri(this.deskUser.deskId,
      this.deskUser.userId))
    .subscribe(responseData => {
      this.translateService.get('REMOVE_USER_DESK_SUCCESS', {
        userId: this.deskUser.userId,
        operatorId: this.deskUser.deskId
      }).subscribe(text =>
        alert(text)
      )
        this.router.navigate([`/desk/${this.deskUser.deskId}/user`])
      },
        error => {
          this.translateService.get('REMOVE_USER_DESK_ERROR', {
            userId: this.deskUser.userId,
            operatorId: this.deskUser.deskId
          }).subscribe(text =>
            alert(text)
          )        
        })
  }
}
