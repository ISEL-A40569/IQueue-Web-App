import { Injectable } from '@angular/core';


@Injectable()
export class LoginService {
    authToken: string

    constructor() { }

    authenticate(userid: string, password: string) {
        return this.authToken = btoa(`${userid}:${password}`)
    }

}