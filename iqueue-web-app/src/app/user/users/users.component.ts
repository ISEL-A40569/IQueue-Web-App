import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user'
import { HttpService } from '../../services/http-service'
import { UriBuilderService } from '../../services/uri-builder-service'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  users: User[] = []
  fetching: boolean = false

  constructor(private httpService: HttpService,
    private uriBuilderService: UriBuilderService) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    this.fetching = true
    this.httpService.get(this.uriBuilderService.getUsersUri())
      .subscribe(responseData => {
        for (const entry in responseData) {
          this.users.push(responseData[entry])
        }
        this.fetching = false
      }, error => {
        this.fetching = false
      })
  }
}
