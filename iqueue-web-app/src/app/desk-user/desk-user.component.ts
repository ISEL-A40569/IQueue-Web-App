import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http-service'
import { DeskUser } from 'src/app/model/desk-user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-desk-user',
  templateUrl: './desk-user.component.html'
})
export class DeskUserComponent implements OnInit {
  deskUser: DeskUser = new DeskUser()

  constructor(private httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.deskUser.deskId = this.route.snapshot.params['deskId']
    this.deskUser.userId = this.route.snapshot.params['userId']
  }

  onRemoveUser() {
    this.httpService.delete(`https://localhost:8443/api/iqueue/desk/${this.deskUser.deskId}/user/${this.deskUser.userId}`)
      .subscribe(responseData => {
        alert(`User ${this.deskUser.userId} successfully removed from desk ${this.deskUser.deskId} !`)
        this.router.navigate([`/desk/${this.deskUser.deskId}/user`])
      },
        error => {
          alert(`Error removing user ${this.deskUser.userId} from desk ${this.deskUser.deskId}!`)
        })
  }
}
