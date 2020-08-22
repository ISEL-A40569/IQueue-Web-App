import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http-service'
import { OperatorUser } from 'src/app/model/operator-user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-operator-user',
  templateUrl: './operator-user.component.html'
})
export class OperatorUserComponent implements OnInit {
  operatorUser: OperatorUser = new OperatorUser()

  constructor(private httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.operatorUser.operatorId = this.route.snapshot.params['operatorId']
    this.operatorUser.userId = this.route.snapshot.params['userId']
  }

  onRemoveUser() {
    this.httpService.delete(`http://localhost:8080/api/iqueue/operator/${this.operatorUser.operatorId}/user/${this.operatorUser.userId}`)
    // this.httpService.delete(`https://localhost:8443/api/iqueue/operator/${this.operatorUser.operatorId}/user/${this.operatorUser.userId}`)
    .subscribe(responseData => {
        alert(`User ${this.operatorUser.userId} successfully removed from operator ${this.operatorUser.operatorId} !`)
        this.router.navigate([`/operator/${this.operatorUser.operatorId}/user`])
      },
        error => {
          alert(`Error removing user ${this.operatorUser.userId} from operator ${this.operatorUser.operatorId}!`)
        })
  }

}
