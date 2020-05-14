import { Component, OnInit } from '@angular/core';
import { User } from '../model/user'
import { HttpService } from '../services/http-service'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  user: User = new User()
  createMode: boolean = true

  constructor(private httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (this.route.snapshot.params['userId']) {
      this.createMode = false
      this.user.userId = this.route.snapshot.params['userId']
      this.getUser()
    }
  }

  getUser() {
    this.httpService
      .get(`https://localhost:8443/api/iqueue/user/${this.user.userId}`)
      .subscribe(responseData => {
        this.user.userName = responseData['userName']
        this.user.email = responseData['email']
        this.user.phoneNumber = responseData['phoneNumber']
        this.user.address = responseData['address']
        this.user.userProfileId = responseData['userProfileId']
      })
  }

  onCreateUser() {
    this.httpService
      .post(`https://localhost:8443/api/iqueue/user`, this.user)
      .subscribe(responseData => {
        this.user.userId = responseData['userId']
        alert(`User successfully created with id ${this.user.userId}!`)
        this.createMode = false
      },
        error => {
          alert('Error creating User!')
        })
  }

  onUpdateUser() {
    this.httpService
      .update(`https://localhost:8443/api/iqueue/user/${this.user.userId}`,
        this.user)
      .subscribe(responseData => {
        alert(`User with id ${this.user.userId} successfully updated!`)
      },
        error => {
          alert(`Error updating user ${this.user.userId}!`)
        })
  }

  onDeleteUser() {
    this.httpService.delete(`https://localhost:8443/api/iqueue/user/${this.user.userId}`)
      .subscribe(responseData => {
        alert(`User with id ${this.user.userId} successfully deleted!`)
        this.router.navigate([`/servicequeues`])
      },
        error => {
          alert(`Error deleting user ${this.user.userId}!`)
        })
  }
}

