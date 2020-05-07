import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user'
import { HttpService } from '../../services/http.service'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  users: User[] = []
  fetching: boolean = false

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    this.fetching = true
    this.httpService.get(`http://localhost:8080/api/iqueue/user`)
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
