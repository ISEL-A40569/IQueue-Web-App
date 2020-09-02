import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http-service'
import { OperatorUser } from 'src/app/model/operator-user';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-operator-user',
  templateUrl: './operator-user.component.html'
})
export class OperatorUserComponent implements OnInit {
  operatorUser: OperatorUser = new OperatorUser()

  constructor(private httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService) { }

  ngOnInit(): void {
    this.operatorUser.operatorId = this.route.snapshot.params['operatorId']
    this.operatorUser.userId = this.route.snapshot.params['userId']
  }

  onRemoveUser() {
    this.httpService.delete(`http://localhost:8080/api/iqueue/operator/${this.operatorUser.operatorId}/user/${this.operatorUser.userId}`)
      // this.httpService.delete(`https://localhost:8443/api/iqueue/operator/${this.operatorUser.operatorId}/user/${this.operatorUser.userId}`)
      .subscribe(responseData => {
        this.translateService.get('REMOVE_USER_OPERATOR_SUCCESS', {
          userId: this.operatorUser.userId,
          operatorId: this.operatorUser.operatorId
        }).subscribe(text =>
          alert(text)
        )
        this.router.navigate([`/operator/${this.operatorUser.operatorId}/user`])
      },
        error => {
          this.translateService.get('REMOVE_USER_OPERATOR_ERROR', {
            userId: this.operatorUser.userId,
            operatorId: this.operatorUser.operatorId
          }).subscribe(text =>
            alert(text)
          )
        })
  }

}
